import {
  CableService,
  InternetService,
  Promotions,
  Services,
  ServicesFormValues,
} from "../../../../types";

type ServicesArr = (CableService | InternetService)[];

export const getSelectedServicesDetails = (
  selectedServices: string[],
  allServices: Services
) => {
  const allServicesArr = joinServices(allServices);

  return allServicesArr.filter((service) =>
    selectedServices.includes(service.NroServicio.toString())
  );
};

export const joinServices: (s: Services) => ServicesArr = (services) => {
  return [
    ...services.internet,
    ...services.cable.required,
    ...services.cable.optional,
  ];
};

export const joinSelectedServices = (selectedServices: ServicesFormValues) => {
  // Filter fields with empty strings
  const services = [
    selectedServices.internet,
    selectedServices.cable.required,
    ...selectedServices.cable.optional,
  ].filter((s) => s);

  return services;
};

export const getPromotion = (
  promotions: Promotions[] | undefined,
  selectedServices: string[]
) => {
  if (!promotions) return;

  const sortedServices = selectedServices.sort();
  const result = promotions.find((promotion) => {
    const sortedPromotionServices = promotion.Servicios.sort();

    if (sortedPromotionServices.length !== sortedServices.length) return false;
    return sortedPromotionServices.every(
      (service, index) => service.toString() === sortedServices[index]
    );
  });

  return result;
};

export const getSubtotal = (selectedServicesDetails: ServicesArr) => {
  return selectedServicesDetails.reduce(
    (prevValue, currentValue) => prevValue + +currentValue.Precio,
    0
  );
};
