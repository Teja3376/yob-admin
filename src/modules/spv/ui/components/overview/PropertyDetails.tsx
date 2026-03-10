import { format } from "date-fns";
import { Building2 } from "lucide-react";

interface PropertyDetailsProps {
  name: string;
  about: string;
  location: string;
  spvName: string;
  spvAbout: string;
  spvCreation: string;
}

const PropertyDetails = ({ name, about, location, spvName, spvAbout, spvCreation   }: PropertyDetailsProps) => {
 
  
  return (
    <div className="rounded-md shadow-xs p-5 border space-y-5 ">
      <div className="space-y-2">
        <h1 className="font-medium" >Asset Details</h1>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-primary/10">
            <Building2 className="text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-medium">{name}</h1>
            <p className="text-sm text-muted-foreground">
              {location || "123 Main Street, Anytown, USA"}
            </p>
          </div>
        </div>
        <div className="px-3 py-2 rounded-md bg-gray-100 mt-5 ">
          <p className="text-sm text-muted-foreground line-clamp-7 wrap-break-word">
            {about}
          </p>
        </div>
      </div>
      <hr />
      <div className="space-y-2">
        <h1 className="font-medium">Spv Details</h1>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-primary/10">
            <Building2 className="text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-medium">{spvName}</h1>
            <p className="text-sm text-muted-foreground">
             Created on: {format(spvCreation,"dd/MM/yyyy") || "-"}
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default PropertyDetails;
