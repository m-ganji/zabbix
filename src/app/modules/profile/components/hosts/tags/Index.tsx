import { useState } from "react";
import { useIntl } from "react-intl";
interface tags {
  showTags: number;
  setShowTags: CallableFunction;
  tagNameVisible: number;
  setTagNameVisible: CallableFunction;
}

export default function Index(props: tags) {
  const [activeButtonTag, setActiveButtonTag] = useState("");

  const intl = useIntl();

  return (
    <div className="d-flex flex-wrap column-gap-5">
      <div className="btn-group py-2 d-block " role="group">
        <p>
          {intl.formatMessage({
            id: "MONITORING.PROBLEMS.TAGS",
          })}
          :
        </p>

        <button
          type="button"
          className={
            "btn btn-light-primary py-2 rounded-end-2" +
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
            "btn btn-light-primary py-2 rounded-start-2" +
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
      <div className="btn-group py-2 d-block " role="group">
        <p>
          {intl.formatMessage({
            id: "MONITORING.PROBLEMS.TAGS.SHOW.TITLE",
          })}
          :
        </p>
        <button
          type="button"
          className={
            "btn btn-light-primary py-2 rounded-end-2" +
            (props.showTags === 0 ? " active" : "")
          }
          onClick={() => {
            props.setShowTags(0);
          }}
        >
          {intl.formatMessage({
            id: "MONITORING.PROBLEMS.TAGS.SHOW.OPTION1",
          })}
        </button>
        <button
          type="button"
          className={
            "btn btn-light-primary py-2" +
            (props.showTags === 1 ? " active" : "")
          }
          onClick={() => {
            props.setShowTags(1);
          }}
        >
          {intl.formatMessage({
            id: "MONITORING.PROBLEMS.TAGS.SHOW.OPTION2",
          })}
        </button>
        <button
          type="button"
          className={
            "btn btn-light-primary py-2 " +
            (props.showTags === 2 ? " active" : "")
          }
          onClick={() => {
            props.setShowTags(2);
          }}
        >
          {intl.formatMessage({
            id: "MONITORING.PROBLEMS.TAGS.SHOW.OPTION3",
          })}
        </button>
        <button
          type="button"
          className={
            "btn btn-light-primary py-2 rounded-start-2" +
            (props.showTags === 3 ? " active" : "")
          }
          onClick={() => {
            props.setShowTags(3);
          }}
        >
          {intl.formatMessage({
            id: "MONITORING.PROBLEMS.TAGS.SHOW.OPTION4",
          })}
        </button>
      </div>
      <div className="btn-group py-2 d-block disabled " role="group">
        <p>
          {intl.formatMessage({
            id: "MONITORING.PROBLEMS.TAGS.NAME.TITLE",
          })}
          :
        </p>
        <button
          type="button"
          className={
            "btn btn-light-primary py-2 rounded-end-2" +
            (props.tagNameVisible === 0 ? " active" : "")
          }
          onClick={() => {
            props.setTagNameVisible(0);
          }}
          disabled={props.showTags === 0}
        >
          {intl.formatMessage({
            id: "MONITORING.PROBLEMS.TAGS.NAME.COMPLETE",
          })}
        </button>
        <button
          type="button"
          className={
            "btn btn-light-primary py-2" +
            (props.tagNameVisible === 1 ? " active" : "")
          }
          onClick={() => {
            props.setTagNameVisible(1);
          }}
          disabled={props.showTags === 0}
        >
          {intl.formatMessage({
            id: "MONITORING.PROBLEMS.TAGS.NAME.SUMMARY",
          })}
        </button>
        <button
          type="button"
          className={
            "btn btn-light-primary py-2 rounded-start-2" +
            (props.tagNameVisible === 2 ? " active" : "")
          }
          onClick={() => {
            props.setTagNameVisible(2);
          }}
          disabled={props.showTags === 0}
        >
          {intl.formatMessage({
            id: "MONITORING.PROBLEMS.TAGS.NAME.NONE",
          })}
        </button>
      </div>
    </div>
  );
}
