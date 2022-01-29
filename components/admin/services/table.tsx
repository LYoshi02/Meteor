import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

import AlertDialog from "../../ui/alert-dialog";
import PaginationFooter from "../../ui/pagination-foooter";
import usePagination from "../../../hooks/usePagination";
import { ServiceSchema } from "../../../types/index";
import useHttp from "../../../hooks/useHttp";
import ServiceModal from "./modal";
import EditServiceForm from "./edit-form";
import useToastOnReq from "../../../hooks/useToastOnReq";
import Table from "../../ui/table";
import ServicesTableRows from "./rows";

type Props = {
  services: (ServiceSchema & { Tipo: string })[];
  servicesCount: number;
  onDeleteService: (serviceNumber: number) => void;
  onEditService: (service: ServiceSchema) => void;
};

const ServicesTable = (props: Props) => {
  const [savedServiceNumber, setSavedServiceNumber] = useState<number>();
  const {
    isOpen: isAlertOpen,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const { sendRequest, success: reqSuccess, error: reqError } = useHttp();
  const { pagination, setNextPage, setPrevPage, changePageSize } =
    usePagination({
      totalElements: props.servicesCount,
    });

  useToastOnReq({
    success: {
      showToast: reqSuccess,
      message: "Servicio eliminado correctamente",
    },
    error: {
      showToast: reqError !== null,
      message: reqError?.message,
    },
  });

  const shownServices = props.services.slice(
    pagination.elementIndexStart,
    pagination.elementIndexEnd
  );

  const openAlertDialog = (serviceNumber: number) => {
    setSavedServiceNumber(serviceNumber);
    onOpenAlert();
  };

  const closeAlertDialog = () => {
    setSavedServiceNumber(undefined);
    onCloseAlert();
  };

  const openModal = (serviceNumber: number) => {
    setSavedServiceNumber(serviceNumber);
    onOpenModal();
  };

  const closeModal = () => {
    setSavedServiceNumber(undefined);
    onCloseModal();
  };

  const deleteService = async () => {
    await sendRequest<{ message: string; serviceNumber: string }>(
      {
        input: `/api/admin/services/${savedServiceNumber}`,
        init: {
          method: "DELETE",
        },
      },
      (data) => props.onDeleteService(+data.serviceNumber)
    );

    closeAlertDialog();
  };

  return (
    <>
      <ServiceModal
        isOpen={isModalOpen}
        onClose={closeModal}
        isEditing={true}
        body={
          <EditServiceForm
            onCloseModal={closeModal}
            serviceNumber={savedServiceNumber}
            onEdit={props.onEditService}
          />
        }
      />

      <AlertDialog
        title={`Borrar Servicio ${savedServiceNumber}`}
        description="Solo se pueden borrar servicios que no han sido contratados."
        isOpen={isAlertOpen}
        onClose={closeAlertDialog}
        actions={{
          primaryBtn: {
            text: "Aceptar",
            action: deleteService,
          },
          secondaryBtn: {
            text: "Cancelar",
            action: closeAlertDialog,
          },
        }}
      />

      <Table
        headingElements={[
          "Nro. de Servicio",
          "Nombre",
          "Tipo",
          "Precio",
          "Acciones",
        ]}
        body={
          <ServicesTableRows
            services={shownServices}
            onOpenAlert={openAlertDialog}
            onOpenModal={openModal}
          />
        }
      />

      <PaginationFooter
        pagination={{
          canNextPage: pagination.canNextPage,
          canPrevPage: pagination.canPrevPage,
          currentPage: pagination.currentPage,
          pageCount: pagination.pageCount,
        }}
        onSetPrevPage={setPrevPage}
        onSetNextPage={setNextPage}
        onChangePageSize={changePageSize}
      />
    </>
  );
};

export default ServicesTable;
