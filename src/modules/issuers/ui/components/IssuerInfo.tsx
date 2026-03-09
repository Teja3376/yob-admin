import { getName } from "country-list";
import { Mail, MapPin, Phone, User } from "lucide-react";

const IssuerInfo = ({
  firstName,
  lastName,
  mobileNumber,
  email,
  country,
}: {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  mobileNumber: string;
}) => {
  const countryCode = country?.slice(0, 2);
  const countryName = getName(countryCode);

  return (
    <div className="w-full h-full rounded-sm shadow-sm p-5 space-y-5 border">
      <h1 className="font-semibold">Issuer Information</h1>
      <div className="grid grid-cols-2 gap-2 gap-y-5">
        <div>
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            {" "}
            <span className="text-primary">
              <User size={15} />
            </span>
            <p>Issuer Name</p>
          </div>
          <h1 className="font-semibold mt-1">
            {firstName} {lastName}
          </h1>
        </div>

        <div>
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            {" "}
            <span className="text-primary">
              <Mail size={15} />
            </span>
            <p>Email</p>
          </div>
          <h1 className="font-semibold mt-1 line-clamp-2">{email}</h1>
        </div>
        <div>
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="text-primary">
              <Phone size={15} />
            </span>
            <p>Phone Number</p>
          </div>
          <h1 className="font-semibold mt-1">{mobileNumber}</h1>
        </div>
        <div>
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="text-primary">
              <MapPin size={15} />
            </span>
            <p>Issuer Name</p>
          </div>
          <h1 className="font-semibold mt-1">{countryName}</h1>
        </div>
      </div>
    </div>
  );
};

export default IssuerInfo;
