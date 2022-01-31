import { Services } from "../../../../types";

type ServiceTypes = "internet" | "cable.required" | "cable.optional";

type ServiceArray = { NroServicio: number; type: ServiceTypes }[];

export const generateServicesArray = (
  services: Services | undefined
): ServiceArray => {
  if (!services) return [];

  const internetServices: ServiceArray = services.internet.map((int) => ({
    NroServicio: int.NroServicio,
    type: "internet",
  }));
  const requiredCableServices: ServiceArray = services.cable.required.map(
    (cab) => ({
      NroServicio: cab.NroServicio,
      type: "cable.required",
    })
  );
  const optionalCableServices: ServiceArray = services.cable.optional.map(
    (cab) => ({
      NroServicio: cab.NroServicio,
      type: "cable.optional",
    })
  );

  return [
    ...internetServices,
    ...requiredCableServices,
    ...optionalCableServices,
  ];
};

export const getServiceType = (
  serviceNumber: number,
  services: ServiceArray
) => {
  const searchedService = services.find(
    (ser) => ser.NroServicio === serviceNumber
  );

  return searchedService?.type;
};
