import { useIntl } from "react-intl";
interface HostProps {
  control: object;
  watch: () => void;
}

const Setvalue: React.FC<HostProps> = ({ control, watch }) => {
  const intl = useIntl();

  return <div>Setvalue</div>;
};

export default Setvalue;
