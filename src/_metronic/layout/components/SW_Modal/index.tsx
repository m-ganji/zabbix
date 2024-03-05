import Swal, { SweetAlertIcon } from "sweetalert2";

interface SwalModalProps {
    title: string;
    icon: SweetAlertIcon | undefined; // Adjusted the type here
}

const SwalModal: React.FC<SwalModalProps> = ({ title, icon }) => {
    // Mapping the icon string to the corresponding SweetAlertIcon type
    const sweetAlertIcon: SweetAlertIcon | undefined = icon as SweetAlertIcon;

    Swal.fire({ title, icon: sweetAlertIcon });
    return null; // Return null as this component doesn't render anything
}

export default SwalModal;
