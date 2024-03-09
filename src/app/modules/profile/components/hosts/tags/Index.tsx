import { useIntl } from "react-intl";
import ToggleBtns from "../../../../../../_metronic/layout/components/ToggleBtn/ToggleBtn";
interface tags {
  showTags: number;
  setShowTags: CallableFunction;
  tagNameVisible: number;
  setTagNameVisible: CallableFunction;
  setValue: CallableFunction;
  activeButtonTag: string;
}

export default function Index({
  setTagNameVisible,
  setShowTags,
  showTags,
  tagNameVisible,
  setValue,
  activeButtonTag,
}: tags) {
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
        <ToggleBtns
          options={[
            {
              value: "0",
              label: "MONITORING.PROBLEMS.TAGS.AND",
            },
            {
              value: "1",
              label: "MONITORING.PROBLEMS.TAGS.OR",
            },
          ]}
          data="evaltype"
          setData={setValue}
          initialData={activeButtonTag}
        />
      </div>
      <div className="btn-group py-2 d-block " role="group">
        <p>
          {intl.formatMessage({
            id: "MONITORING.PROBLEMS.TAGS.NAME.TITLE",
          })}
          :
        </p>
        <ToggleBtns
          options={[
            {
              value: 0,
              label: "MONITORING.PROBLEMS.TAGS.SHOW.OPTION1",
            },
            {
              value: 1,
              label: "MONITORING.PROBLEMS.TAGS.SHOW.OPTION2",
            },
            {
              value: 2,
              label: "MONITORING.PROBLEMS.TAGS.SHOW.OPTION3",
            },
            {
              value: 3,
              label: "MONITORING.PROBLEMS.TAGS.SHOW.OPTION4",
            },
          ]}
          data=""
          setData={setShowTags}
          initialData={showTags}
        />
      </div>
      <div className="btn-group py-2 d-block disabled " role="group">
        <p>
          {intl.formatMessage({
            id: "MONITORING.PROBLEMS.TAGS.SHOW.TITLE",
          })}
          :
        </p>
        <ToggleBtns
          options={[
            {
              value: 0,
              label: "MONITORING.PROBLEMS.TAGS.NAME.COMPLETE",
            },
            {
              value: 1,
              label: "MONITORING.PROBLEMS.TAGS.NAME.SUMMARY",
            },
            {
              value: 2,
              label: "MONITORING.PROBLEMS.TAGS.NAME.NONE",
            },
          ]}
          data=""
          setData={setTagNameVisible}
          initialData={tagNameVisible}
        />
      </div>
    </div>
  );
}
