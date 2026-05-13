"use client";
import { useParams } from "next/navigation";
import useGetVehicleById from "../../hooks/vehicles/useGetVehicleById";

const VehicleDetailPage = () => {
  const { vehicleId } = useParams();
  const {
    data: vehicle,
    isLoading,
    isError,
  } = useGetVehicleById(vehicleId as string);
  return <div></div>;
};

export default VehicleDetailPage;
