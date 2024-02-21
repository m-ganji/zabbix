import { useIntl } from "react-intl";
interface Severity {
  id: number;
  title: string;
  color: string;
}

export default function Index({
  watch,
  setValue,
}: {
  watch: CallableFunction;
  setValue: CallableFunction;
}) {
  const intl = useIntl();
  const severitiesData: {
    id: number;
    title: string;
    color: string;
    bg: string;
  }[] = [
    {
      id: 0,
      title: intl.formatMessage({ id: "MONITORING.HOSTS.SEVERITY.OPTION1" }),
      color: "info",
      bg: "bg-green",
    },

    {
      id: 2,
      title: intl.formatMessage({ id: "MONITORING.HOSTS.SEVERITY.OPTION2" }),
      color: "coral",
      bg: "bg-yellow-500/70",
    },
    {
      id: 4,
      title: intl.formatMessage({ id: "MONITORING.HOSTS.SEVERITY.OPTION3" }),
      color: "orange",
      bg: "bg-yellow-700",
    },
    {
      id: 1,
      title: intl.formatMessage({ id: "MONITORING.HOSTS.SEVERITY.OPTION4" }),
      color: "orangered",
      bg: "bg-/80",
    },
    {
      id: 3,
      title: intl.formatMessage({ id: "MONITORING.HOSTS.SEVERITY.OPTION5" }),
      color: "orangered",
      bg: "bg-/80",
    },
    {
      id: 5,
      title: intl.formatMessage({ id: "MONITORING.HOSTS.SEVERITY.OPTION6" }),
      color: "orangered",
      bg: "bg-/80",
    },
  ];
  const watchSeverities = watch("severities");

  const handleCheckboxChange = (
    severity: Severity,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const currentGroupids = watchSeverities || [];
    const updatedGroupids = e.target.checked
      ? [...currentGroupids, severity.id]
      : currentGroupids.filter((id: number) => id !== severity.id);

    setValue(
      "severities",
      Array.from(
        new Set(updatedGroupids.filter((id: number) => id !== undefined))
      )
    );
  };
  return (
    <div className="row">
      {severitiesData.map((severity) => (
        <div className={`col-md-4 d-flex `} key={severity.id}>
          <div className="d-flex align-baseline">
            <input
              type="checkbox"
              name={`severity-${severity.id}`}
              id={`severity-${severity.id}`}
              onChange={(e) => handleCheckboxChange(severity, e)}
              title={severity.title}
              checked={watchSeverities?.includes(severity.id) || false}
            />
            <span className="form-check-label m-2">{severity.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
