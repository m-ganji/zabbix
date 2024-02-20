import { useState } from "react";
import { useIntl } from "react-intl";

export default function Index() {
  const [activeButtonTag, setActiveButtonTag] = useState("");
  const [activeButtonShowTag, setActiveButtonShowTag] = useState("");
  const [activeButtonTagName, setActiveButtonTagName] = useState("");

  const intl = useIntl();

  return (
    <div className="d-flex ">
      <div
        className="btn-group py-2 d-block "
        role="group"
        aria-label="Basic example"
        style={{ width: "33%" }}
      >
        <p>
          {intl.formatMessage({
            id: "MONITORING.PROBLEMS.TAGS",
          })}
          :
        </p>

        <button
          type="button"
          className={
            "btn btn-primary py-2 rounded-end-2" +
            (activeButtonTag === "and/or" ? " active" : "")
          }
          onClick={() => {
            console.log("and/or");
            setActiveButtonTag("and/or");
          }}
        >
          {intl.formatMessage({
            id: "MONITORING.PROBLEMS.TAGS.AND",
          })}
        </button>
        <button
          type="button"
          className={
            "btn btn-primary py-2 rounded-start-2" +
            (activeButtonTag === "OR" ? " active" : "")
          }
          onClick={() => {
            console.log("OR");
            setActiveButtonTag("OR");
          }}
        >
          {intl.formatMessage({
            id: "MONITORING.PROBLEMS.TAGS.OR",
          })}
        </button>
      </div>
      <div
        className="btn-group py-2 d-block "
        role="group"
        aria-label="Basic example"
        style={{ width: "33%" }}
      >
        <p>
          {intl.formatMessage({
            id: "MONITORING.PROBLEMS.TAGS.SHOW.TITLE",
          })}
          :
        </p>
        <button
          type="button"
          className={
            "btn btn-primary py-2 rounded-end-2" +
            (activeButtonShowTag ===
            intl.formatMessage({
              id: "MONITORING.PROBLEMS.TAGS.SHOW.OPTION1",
            })
              ? " active"
              : "")
          }
          onClick={() => {
            setActiveButtonShowTag(
              intl.formatMessage({
                id: "MONITORING.PROBLEMS.TAGS.SHOW.OPTION1",
              })
            );
          }}
        >
          {intl.formatMessage({
            id: "MONITORING.PROBLEMS.TAGS.SHOW.OPTION1",
          })}
        </button>
        <button
          type="button"
          className={
            "btn btn-primary py-2 rounded-start-2" +
            (activeButtonShowTag ===
            intl.formatMessage({
              id: "MONITORING.PROBLEMS.TAGS.SHOW.OPTION2",
            })
              ? " active"
              : "")
          }
          onClick={() => {
            setActiveButtonShowTag(
              intl.formatMessage({
                id: "MONITORING.PROBLEMS.TAGS.SHOW.OPTION2",
              })
            );
          }}
        >
          {intl.formatMessage({
            id: "MONITORING.PROBLEMS.TAGS.SHOW.OPTION2",
          })}
        </button>
        <button
          type="button"
          className={
            "btn btn-primary py-2 rounded-start-2" +
            (activeButtonShowTag ===
            intl.formatMessage({
              id: "MONITORING.PROBLEMS.TAGS.SHOW.OPTION3",
            })
              ? " active"
              : "")
          }
          onClick={() => {
            setActiveButtonShowTag(
              intl.formatMessage({
                id: "MONITORING.PROBLEMS.TAGS.SHOW.OPTION3",
              })
            );
          }}
        >
          {intl.formatMessage({
            id: "MONITORING.PROBLEMS.TAGS.SHOW.OPTION3",
          })}
        </button>
        <button
          type="button"
          className={
            "btn btn-primary py-2 rounded-start-2" +
            (activeButtonShowTag ===
            intl.formatMessage({
              id: "MONITORING.PROBLEMS.TAGS.SHOW.OPTION4",
            })
              ? " active"
              : "")
          }
          onClick={() => {
            setActiveButtonShowTag(
              intl.formatMessage({
                id: "MONITORING.PROBLEMS.TAGS.SHOW.OPTION4",
              })
            );
          }}
        >
          {intl.formatMessage({
            id: "MONITORING.PROBLEMS.TAGS.SHOW.OPTION4",
          })}
        </button>
      </div>
      <div
        className="btn-group py-2 d-block "
        role="group"
        aria-label="Basic example"
        style={{ width: "33%" }}
      >
        <p>
          {intl.formatMessage({
            id: "MONITORING.PROBLEMS.TAGS.NAME.TITLE",
          })}
          :
        </p>
        <button
          type="button"
          className={
            "btn btn-primary py-2 rounded-end-2" +
            (activeButtonTagName ===
            intl.formatMessage({
              id: "MONITORING.PROBLEMS.TAGS.NAME.COMPLETE",
            })
              ? " active"
              : "")
          }
          onClick={() => {
            setActiveButtonTagName(
              intl.formatMessage({
                id: "MONITORING.PROBLEMS.TAGS.NAME.COMPLETE",
              })
            );
          }}
        >
          {intl.formatMessage({
            id: "MONITORING.PROBLEMS.TAGS.NAME.COMPLETE",
          })}
        </button>
        <button
          type="button"
          className={
            "btn btn-primary py-2 rounded-start-2" +
            (activeButtonTagName ===
            intl.formatMessage({
              id: "MONITORING.PROBLEMS.TAGS.NAME.SUMMARY",
            })
              ? " active"
              : "")
          }
          onClick={() => {
            setActiveButtonTagName(
              intl.formatMessage({
                id: "MONITORING.PROBLEMS.TAGS.NAME.SUMMARY",
              })
            );
          }}
        >
          {intl.formatMessage({
            id: "MONITORING.PROBLEMS.TAGS.NAME.SUMMARY",
          })}
        </button>
        <button
          type="button"
          className={
            "btn btn-primary py-2 rounded-start-2" +
            (activeButtonTagName ===
            intl.formatMessage({
              id: "MONITORING.PROBLEMS.TAGS.NAME.NONE",
            })
              ? " active"
              : "")
          }
          onClick={() => {
            setActiveButtonTagName(
              intl.formatMessage({
                id: "MONITORING.PROBLEMS.TAGS.NAME.NONE",
              })
            );
          }}
        >
          {intl.formatMessage({
            id: "MONITORING.PROBLEMS.TAGS.NAME.NONE",
          })}
        </button>
      </div>
    </div>
  );
}
