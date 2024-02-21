import { useIntl } from "react-intl";

export default function Index() {
  const intl = useIntl();
  const severitiesData = [
    {
      id: 0,
      title: intl.formatMessage({ id: "MONITORING.HOSTS.SEVERITY.OPTION1" }),
    },
    {
      id: 2,
      title: intl.formatMessage({ id: "MONITORING.HOSTS.SEVERITY.OPTION2" }),
    },
    {
      id: 4,
      title: intl.formatMessage({ id: "MONITORING.HOSTS.SEVERITY.OPTION3" }),
    },
    {
      id: 1,
      title: intl.formatMessage({ id: "MONITORING.HOSTS.SEVERITY.OPTION4" }),
    },
    {
      id: 3,
      title: intl.formatMessage({ id: "MONITORING.HOSTS.SEVERITY.OPTION5" }),
    },
    {
      id: 5,
      title: intl.formatMessage({ id: "MONITORING.HOSTS.SEVERITY.OPTION6" }),
    },
  ];
  return (
    <div className="row">
      {severitiesData.map((severity, index) => (
        <div className={`col-md-4 d-flex  `} key={severity.id}>
          <div className="d-flex align-baseline">
            <input
              type="checkbox"
              name={`Checkboxes15-${severity.id}`}
              id={`severity-${severity.id}`}
            />
            <span className="form-check-label m-2">{severity.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
