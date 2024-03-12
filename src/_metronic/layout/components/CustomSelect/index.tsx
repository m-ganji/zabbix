// import React, { useState } from "react";
// import { KTIcon } from "../../../helpers";

// type Props = {
//   index: number;
//   macrosField?: any[]; // Making macrosField optional
//   onVaultSecretSelected: () => void; // Callback for when vault secret is selected
// };

// export default function Index({ index, macrosField = [], onVaultSecretSelected }: Props) {
//   const [dropdownStates, setDropdownStates] = useState(
//     new Array(macrosField.length).fill(false)
//   );

//   const [selectedOptions, setSelectedOptions] = useState(
//     new Array(macrosField.length).fill(null)
//   );

//   const toggleDropdown = (index?: number) => {
//     const newDropdownStates = [...dropdownStates];
//     if (index !== undefined) {
//       newDropdownStates[index] = !newDropdownStates[index];
//     } else {
//       newDropdownStates.fill(false);
//     }
//     setDropdownStates(newDropdownStates);
//   };

//   const selectOption = (
//     option: { props: { iconName: string } },
//     index: number
//   ) => {
//     let typeValue;
//     if (option.props.iconName === 'text') {
//       typeValue = 0;
//     } else if (option.props.iconName === 'eye-slash') {
//       typeValue = 1;
//     } else if (option.props.iconName === 'lock-2') {
//       typeValue = 2;
//       // If "vault secret" is selected, call the callback
//       onVaultSecretSelected();
//     }
//     // setValue(`macros[${index}].type`, typeValue);
//     const newSelectedOptions = [...selectedOptions];
//     newSelectedOptions[index] = option;
//     setSelectedOptions(newSelectedOptions);
//     toggleDropdown(index);
//   };

//   return (
//     <div className="options position-absolute border card" style={{ zIndex: 100 }}>
//       <div
//         key={0}
//         className="d-flex justify-content-end gap-2 p-2"
//         onClick={() => {
//           selectOption(<KTIcon iconName="text" className="fs-2 d-flex" />, index);
//         }}
//       >
//         text
//         <KTIcon iconName="text" className="fs-2 d-flex justify-content-center justify-content-end gap-2" />
//       </div>

//       <div
//         key={1}
//         className="d-flex justify-content-end gap-2 p-2"
//         onClick={() => selectOption(<KTIcon iconName="eye-slash" className="fs-2" />, index)}
//       >
//         secret text
//         <KTIcon iconName="eye-slash" className="fs-2" />
//       </div>

//       <div
//         key={2}
//         className="d-flex justify-content-end gap-2 p-2"
//         onClick={() => selectOption(<KTIcon iconName="lock-2" className="fs-2" />, index)}
//       >
//         vault secret <KTIcon iconName="lock-2" className="fs-2" />
//       </div>
//     </div>
//   );
// }
