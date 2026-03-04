import React from "react";
import { XCircle, Clock, Circle, CheckCircle } from "lucide-react";

export enum OrderStatus {
    INITIATED = "initiated",
    PAYMENT_PENDING = "payment_pending",
    PAYMENT_SUCCESS = "payment_success",
    PAYMENT_FAILED = "payment_failed",
    TOKEN_TRANSFER_PENDING = "token_transfer_pending",
    TOKEN_TRANSFERRED = "token_transferred",
    TOKEN_TRANSFER_FAILED = "token_transfer_failed",
    COMPLETED = "completed",
    ORDER_FAILED = "order_failed",
}

interface OrderStepperProps {
    currentStatus: OrderStatus;
}

type StepState = "completed" | "failed" | "current" | "upcoming";

const OrderStepper = ({ currentStatus }: OrderStepperProps) => {
    // Define the visible steps - pending states are only shown on failure/success
    const getVisibleSteps = (): OrderStatus[] => {
        const baseSteps: OrderStatus[] = [
            OrderStatus.INITIATED,
            OrderStatus.PAYMENT_SUCCESS,
            OrderStatus.TOKEN_TRANSFERRED,
            OrderStatus.COMPLETED,
        ];

        // Add failed states if they occurred
        if (currentStatus === OrderStatus.PAYMENT_FAILED) {
            return [
                OrderStatus.INITIATED,
                OrderStatus.PAYMENT_FAILED,
            ];
        }

        if (currentStatus === OrderStatus.TOKEN_TRANSFER_FAILED) {
            const idx = baseSteps.indexOf(OrderStatus.TOKEN_TRANSFERRED);
            return [
                ...baseSteps.slice(0, idx),
                OrderStatus.TOKEN_TRANSFER_FAILED,
            ];
        }

        if (currentStatus === OrderStatus.ORDER_FAILED) {
            return [OrderStatus.INITIATED, OrderStatus.ORDER_FAILED];
        }

        return baseSteps;
    };

    const steps = getVisibleSteps();
    const getStepState = (step: OrderStatus): StepState => {
        if (currentStatus === OrderStatus.COMPLETED) {
            return "completed";
        }

        if (
            currentStatus === OrderStatus.PAYMENT_FAILED &&
            step === OrderStatus.PAYMENT_FAILED
        ) {
            return "failed";
        }

        if (
            currentStatus === OrderStatus.TOKEN_TRANSFER_FAILED &&
            step === OrderStatus.TOKEN_TRANSFER_FAILED
        ) {
            return "failed";
        }

        if (currentStatus === OrderStatus.ORDER_FAILED) {
            return "failed";
        }

        const currentIndex = steps.indexOf(currentStatus);
        const stepIndex = steps.indexOf(step);

        if (stepIndex <= currentIndex) return "completed";
        return "upcoming";
    };

    const getStepLabel = (status: OrderStatus): string => {
        const labels: Record<OrderStatus, string> = {
            [OrderStatus.INITIATED]: "Order Initiated",
            [OrderStatus.PAYMENT_PENDING]: "Payment Pending",
            [OrderStatus.PAYMENT_SUCCESS]: "Payment Confirmed",
            [OrderStatus.PAYMENT_FAILED]: "Payment Failed",
            [OrderStatus.TOKEN_TRANSFER_PENDING]: "Transfer Pending",
            [OrderStatus.TOKEN_TRANSFERRED]: "Tokens Transferred",
            [OrderStatus.TOKEN_TRANSFER_FAILED]: "Transfer Failed",
            [OrderStatus.COMPLETED]: "Order Complete",
            [OrderStatus.ORDER_FAILED]: "Order Failed",
        };
        return labels[status] || status.replace(/_/g, " ");
    };

    return (
        <div className="border rounded-md w-96">
            <div className="px-4 py-2 bg-primary/10 rounded-t-md ">
                <h2 className="text-md font-medium">Order Status:</h2>
            </div>
            <div className="flex flex-col gap-8 items-center justify-center h-90">
                {/* Stepper */}
                <div className="relative">
                    {/* Connecting line */}
                    {steps.length > 1 && (
                        <div
                            className="absolute left-[15px] top-6 bottom-0 w-1 bg-gradient-to-b from-gray-200 to-gray-100"
                            style={{ height: `calc(100% - 48px)` }}
                        />
                    )}

                    {/* Steps */}
                    <div className="space-y-6 relative z-10">
                        {steps.map((step) => {
                            const state = getStepState(step);

                            return (
                                <div key={step} className="flex gap-6 items-start">
                                    {/* Icon Container */}
                                    <div className="relative flex-shrink-0">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${state === "completed"
                                                ? "bg-green-100 border-2 border-green-500"
                                                : state === "failed"
                                                    ? "bg-red-100 border-2 border-red-500"
                                                    : state === "current"
                                                        ? "bg-blue-100 border-2 border-blue-500 animate-pulse"
                                                        : "bg-gray-100 border-2 border-gray-300"
                                                }`}
                                        >
                                            {state === "completed" && (
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                            )}
                                            {state === "failed" && (
                                                <XCircle className="w-4 h-4 text-red-500" />
                                            )}
                                            {state === "current" && (
                                                <Clock className="w-4 h-4 text-blue-500" />
                                            )}
                                            {state === "upcoming" && (
                                                <Circle className="w-4 h-4 text-gray-400" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="">
                                        <h3
                                            className={`font-semibold text-base transition-colors ${state === "completed"
                                                ? "text-green-500"
                                                : state === "failed"
                                                    ? "text-red-500"
                                                    : state === "current"
                                                        ? "text-blue-500"
                                                        : "text-gray-400"
                                                }`}
                                        >
                                            {getStepLabel(step)}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {state === "completed" && "Completed successfully"}
                                            {state === "failed" && (
                                                step === OrderStatus.PAYMENT_FAILED
                                                    ? "Payment failed. Please retry."
                                                    : step === OrderStatus.TOKEN_TRANSFER_FAILED
                                                        ? "Transfer failed. Try again shortly."
                                                        : step === OrderStatus.ORDER_FAILED
                                                            ? "Order could not be completed."
                                                            : "Process failed."
                                            )}
                                            {state === "current" && "Currently processing..."}
                                            {state === "upcoming" && "Waiting to begin"}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderStepper;
