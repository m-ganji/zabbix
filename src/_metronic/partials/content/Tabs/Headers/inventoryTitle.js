const inputsTitle = [
  {
    id: 2,
    title: "نوع ",
    isTextArea: false,
    isFullWidth: false,
    name: "type",
  },
  {
    id: 3,
    title: "نوع (جزئیات کامل)",
    isTextArea: false,
    isFullWidth: false,
    name: "type_full",
  },
  {
    id: 1,
    title: "اسم",
    isTextArea: false,
    isFullWidth: false,
    name: "name",
  },
  {
    id: 6,
    title: "نام مستعار",
    isTextArea: false,
    isFullWidth: false,
    name: "alias",
  },
  {
    id: 7,
    title: "سیستم عامل",
    isTextArea: false,
    isFullWidth: false,
    name: "os",
  },
  {
    id: 8,
    title: "سیستم عامل (جزئیات کامل)",
    isTextArea: false,
    isFullWidth: false,
    name: "os_full",
  },
  {
    id: 9,
    title: "سیستم عامل (کوتاه)",
    isTextArea: false,
    isFullWidth: false,
    name: "os_short",
  },
  {
    id: 10,
    title: "شماره سریال A",
    isTextArea: false,
    isFullWidth: false,
    name: "serialno_a",
  },
  {
    id: 11,
    title: "شماره سریال B",
    isTextArea: false,
    isFullWidth: false,
    name: "serialno_b",
  },
  {
    id: 12,
    title: "برچسب",
    isTextArea: false,
    isFullWidth: false,
    name: "tag",
  },
  {
    id: 13,
    title: "برچسب دارایی",
    isTextArea: false,
    isFullWidth: false,
    name: "asset_tag",
  },
  {
    id: 14,
    title: "آدرس اول مک",
    isTextArea: false,
    isFullWidth: false,
    name: "macaddress_a",
  },
  {
    id: 15,
    title: "آدرس دوم مک",
    isTextArea: false,
    isFullWidth: false,
    name: "macaddress_b",
  },
  {
    id: 16,
    title: "نرم افزار",
    isTextArea: false,
    isFullWidth: false,
    name: "software",
  },
  {
    id: 17,
    title: "سخت افزار",
    isTextArea: false,
    isFullWidth: true,
    name: "hardware",
  },
  {
    id: 18,
    title: "سخت افزار (جزئیات کامل)",
    isTextArea: true,
    isFullWidth: false,
    name: "hardware_full",
  },
  {
    id: 19,
    title: "نرم افزار (جزئیات کامل)",
    isTextArea: false,
    isFullWidth: false,
    name: "software_full",
  },
  {
    id: 20,
    title: "نرم افزار اول",
    isTextArea: false,
    isFullWidth: false,
    name: "software_app_a",
  },
  {
    id: 21,
    title: "نرم افزار کاربردی دوم",
    isTextArea: false,
    isFullWidth: false,
    name: "software_app_b",
  },
  {
    id: 22,
    title: "نرم افزار سوم",
    isTextArea: false,
    isFullWidth: false,
    name: "software_app_c",
  },
  {
    id: 23,
    title: "نرم افزار چهارم",
    isTextArea: false,
    isFullWidth: false,
    name: "software_app_d",
  },
  {
    id: 24,
    title: "نرم افزار پنجم",
    isTextArea: false,
    isFullWidth: false,
    name: "software_app_e",
  },
  {
    id: 25,
    title: "مخاطب",
    isTextArea: true,
    isFullWidth: false,
    name: "contact",
  },
  {
    id: 26,
    title: "مکان",
    isTextArea: true,
    isFullWidth: false,
    name: "location",
  },
  {
    id: 27,
    title: "عرض جغرافیایی مکان",
    isTextArea: false,
    isFullWidth: false,
    name: "location_lat",
  },
  {
    id: 28,
    title: "طول جغرافیایی مکان",
    isTextArea: false,
    isFullWidth: false,
    name: "location_lon",
  },
  {
    id: 29,
    title: "یادداشت",
    isTextArea: true,
    isFullWidth: false,
    name: "notes",
  },
  {
    id: 30,
    title: "شاسی",
    isTextArea: false,
    isFullWidth: false,
    name: "chassis",
  },
  {
    id: 31,
    title: "مدل",
    isTextArea: false,
    isFullWidth: false,
    name: "model",
  },
  {
    id: -33,
    title: "معماری HW",
    isTextArea: false,
    isFullWidth: false,
    name: "hw_arch",
  },
  {
    id: -34,
    title: "Vendor",
    isTextArea: false,
    isFullWidth: false,
    name: "vendor",
  },
  {
    id: 32,
    title: "شماره قرارداد",
    isTextArea: false,
    isFullWidth: false,
    name: "contract_number",
  },
  {
    id: 33,
    title: "نام نصب کننده",
    isTextArea: false,
    isFullWidth: false,
    name: "installer_name",
  },

  {
    id: 34,
    title: "وضعیت استقرار",
    isTextArea: false,
    isFullWidth: false,
    name: "deployment_status",
  },
  {
    id: 35,
    title: "آدرس URL اول",
    isTextArea: false,
    isFullWidth: false,
    name: "url_a",
  },
  {
    id: 36,
    title: "آدرس URL دوم",
    isTextArea: false,
    isFullWidth: false,
    name: "url_b",
  },
  {
    id: 37,
    title: "آدرس URL سوم",
    isTextArea: false,
    isFullWidth: false,
    name: "url_c",
  },
  {
    id: 38,
    title: "شبکه های میزبان",
    isTextArea: true,
    isFullWidth: false,
    name: "host_networks",
  },
  {
    id: 39,
    title: "ماسک زیر شبکه میزبان",
    isTextArea: false,
    isFullWidth: false,
    name: "host_netmask",
  },
  {
    id: 40,
    title: "روتر میزبان",
    isTextArea: false,
    isFullWidth: false,
    name: "host_router",
  },
  {
    id: 41,
    title: "آدرس IP OOB",
    isTextArea: false,
    isFullWidth: false,
    name: "oob_ip",
  },
  {
    id: 42,
    title: "ماسک زیر شبکه OOB",
    isTextArea: false,
    isFullWidth: false,
    name: "oob_netmask",
  },
  {
    id: 43,
    title: "روتر OOB",
    isTextArea: false,
    isFullWidth: false,
    name: "oob_router",
  },
  {
    id: 44,
    title: "تاریخ خرید HW",
    isTextArea: false,
    isFullWidth: false,
    name: "date_hw_purchase",
  },
  {
    id: 45,
    title: "تاریخ نصب HW",
    isTextArea: false,
    isFullWidth: false,
    name: "date_hw_install",
  },
  {
    id: 46,
    title: "تاریخ انقضای تعمیر و نگهداری HW",
    isTextArea: false,
    isFullWidth: false,
    name: "date_hw_expiry",
  },
  {
    id: 47,
    title: "تاریخ انحلال HW",
    isTextArea: false,
    isFullWidth: false,
    name: "date_hw_decomm",
  },
  {
    id: 48,
    title: "آدرس سایت اول",
    isTextArea: false,
    isFullWidth: false,
    name: "site_address_a",
  },
  {
    id: 49,
    title: "آدرس سایت دوم",
    isTextArea: false,
    isFullWidth: false,
    name: "site_address_b",
  },
  {
    id: -49,
    title: "آدرس سایت سوم",
    isTextArea: false,
    isFullWidth: false,
    name: "site_address_c",
  },
  {
    id: 51,
    title: "شهر سایت",
    isTextArea: false,
    isFullWidth: false,
    name: "site_city",
  },
  {
    id: 52,
    title: "استان سایت",
    isTextArea: false,
    isFullWidth: false,
    name: "site_state", 
  },
  {
    id: 53,
    title: "کشور سایت",
    isTextArea: false,
    isFullWidth: false,
    name: "site_country",
  },
  {
    id: 54,
    title: "کد پستی سایت",
    isTextArea: false,
    isFullWidth: false,
    name: "site_zip",
  },
  {
    id: -54,
    title: "محل قفسه سایت",
    isTextArea: false,
    isFullWidth: false,
    name: "site_rack",
  },
  {
    id: 55,
    title: "یادداشت های سایت",
    isTextArea: true,
    isFullWidth: false,
    name: "site_notes",
  },
  {
    id: -56,
    title: "نام POC اولیه",
    isTextArea: false,
    isFullWidth: false,
    name: "poc_1_name",
  },
  {
    id: 56,
    title: "ایمیل POC اولیه",
    isTextArea: false,
    isFullWidth: false,
    name: "poc_1_email",
  },
  {
    id: 57,
    title: "تلفن POC اولیه A",
    isTextArea: false,
    isFullWidth: false,
    name: "poc_1_phone_a",
  },
  {
    id: 58,
    title: "تلفن POC اولیه B",
    isTextArea: false,
    isFullWidth: false,
    name: "poc_1_phone_b",
  },
  {
    id: 59,
    title: "سلول POC",
    isTextArea: false,
    isFullWidth: false,
    name: "poc_1_cell",
  },
  {
    id: -59,
    title: "نام صفحه نمایش POC اولیه",
    isTextArea: false,
    isFullWidth: false,
    name: "poc_1_screen",
  },
  {
    id: 63,
    title: "یادداشت های اولیه POC",
    isTextArea: true,
    isFullWidth: false,
    name: "poc_1_notes",
  },
  {
    id: -61,
    title: "دومین نام POC",
    isTextArea: false,
    isFullWidth: false,
    name: "poc_2_name",
  },
  {
    id: -65,
    title: "دومین ایمیل POC",
    isTextArea: false,
    isFullWidth: false,
    name:"poc_2_email"
  },
  {
    id: -70,
    title: "دومین تلفن POC مربوط به A",
    isTextArea: false,
    isFullWidth: false,
    name: "poc_2_phone_a",
  },
  {
    id: 60,
    title: "دومین تلفن POC مربوط به B",
    isTextArea: false,
    isFullWidth: false,
    name: "poc_2_phone_b",
  },

  {
    id: 61,
    title: "دومین سلول POC",
    isTextArea: false,
    isFullWidth: false,
    name: "poc_2_cell",
  },
  {
    id: 62,
    title: "دومین نام صفحه نمایش POC ثانویه",
    isTextArea: false,
    isFullWidth: false,
    name: "poc_2_screen",
  },
  {
    id: -71,
    title: "یادداشت های دوم مربوط به POC",
    isTextArea: true,
    isFullWidth: false,
    name: "poc_2_notes",
  },
];

export default inputsTitle;
