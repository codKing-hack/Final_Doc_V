// ==================== DOCUMENT PORTAL - VANILLA JAVASCRIPT ==================== //

// --- CONFIGURATION ---
const API_BASE_URL = 'http://localhost:5000/api';

// --- CONSTANTS ---
const COUNTRY_CODES = [
    { name: "Afghanistan", code: "AF", dial_code: "+93", flag: "🇦🇫" },
    { name: "Albania", code: "AL", dial_code: "+355", flag: "🇦🇱" },
    { name: "Algeria", code: "DZ", dial_code: "+213", flag: "🇩🇿" },
    { name: "American Samoa", code: "AS", dial_code: "+1684", flag: "🇦🇸" },
    { name: "Andorra", code: "AD", dial_code: "+376", flag: "🇦🇩" },
    { name: "Angola", code: "AO", dial_code: "+244", flag: "🇦🇴" },
    { name: "Anguilla", code: "AI", dial_code: "+1264", flag: "🇦🇮" },
    { name: "Antarctica", code: "AQ", dial_code: "+672", flag: "🇦🇶" },
    { name: "Antigua & Barbuda", code: "AG", dial_code: "+1268", flag: "🇦🇬" },
    { name: "Argentina", code: "AR", dial_code: "+54", flag: "🇦🇷" },
    { name: "Armenia", code: "AM", dial_code: "+374", flag: "🇦🇲" },
    { name: "Aruba", code: "AW", dial_code: "+297", flag: "🇦🇼" },
    { name: "Australia", code: "AU", dial_code: "+61", flag: "🇦🇺" },
    { name: "Austria", code: "AT", dial_code: "+43", flag: "🇦🇹" },
    { name: "Azerbaijan", code: "AZ", dial_code: "+994", flag: "🇦🇿" },
    { name: "Bahamas", code: "BS", dial_code: "+1242", flag: "🇧🇸" },
    { name: "Bahrain", code: "BH", dial_code: "+973", flag: "🇧🇭" },
    { name: "Bangladesh", code: "BD", dial_code: "+880", flag: "🇧🇩" },
    { name: "Barbados", code: "BB", dial_code: "+1246", flag: "🇧🇧" },
    { name: "Belarus", code: "BY", dial_code: "+375", flag: "🇧🇾" },
    { name: "Belgium", code: "BE", dial_code: "+32", flag: "🇧🇪" },
    { name: "Belize", code: "BZ", dial_code: "+501", flag: "🇧🇿" },
    { name: "Benin", code: "BJ", dial_code: "+229", flag: "🇧🇯" },
    { name: "Bermuda", code: "BM", dial_code: "+1441", flag: "🇧🇲" },
    { name: "Bhutan", code: "BT", dial_code: "+975", flag: "🇧🇹" },
    { name: "Bolivia", code: "BO", dial_code: "+591", flag: "🇧🇴" },
    { name: "Bosnia & Herzegovina", code: "BA", dial_code: "+387", flag: "🇧🇦" },
    { name: "Botswana", code: "BW", dial_code: "+267", flag: "🇧🇼" },
    { name: "Brazil", code: "BR", dial_code: "+55", flag: "🇧🇷" },
    { name: "British Indian Ocean Territory", code: "IO", dial_code: "+246", flag: "🇮🇴" },
    { name: "British Virgin Islands", code: "VG", dial_code: "+1284", flag: "🇻🇬" },
    { name: "Brunei", code: "BN", dial_code: "+673", flag: "🇧🇳" },
    { name: "Bulgaria", code: "BG", dial_code: "+359", flag: "🇧🇬" },
    { name: "Burkina Faso", code: "BF", dial_code: "+226", flag: "🇧🇫" },
    { name: "Burundi", code: "BI", dial_code: "+257", flag: "🇧🇮" },
    { name: "Cambodia", code: "KH", dial_code: "+855", flag: "🇰🇭" },
    { name: "Cameroon", code: "CM", dial_code: "+237", flag: "🇨🇲" },
    { name: "Canada", code: "CA", dial_code: "+1", flag: "🇨🇦" },
    { name: "Cape Verde", code: "CV", dial_code: "+238", flag: "🇨🇻" },
    { name: "Cayman Islands", code: "KY", dial_code: "+1345", flag: "🇰🇾" },
    { name: "Central African Republic", code: "CF", dial_code: "+236", flag: "🇨🇫" },
    { name: "Chad", code: "TD", dial_code: "+235", flag: "🇹🇩" },
    { name: "Chile", code: "CL", dial_code: "+56", flag: "🇨🇱" },
    { name: "China", code: "CN", dial_code: "+86", flag: "🇨🇳" },
    { name: "Christmas Island", code: "CX", dial_code: "+61", flag: "🇨🇽" },
    { name: "Cocos Islands", code: "CC", dial_code: "+61", flag: "🇨🇨" },
    { name: "Colombia", code: "CO", dial_code: "+57", flag: "🇨🇴" },
    { name: "Comoros", code: "KM", dial_code: "+269", flag: "🇰🇲" },
    { name: "Cook Islands", code: "CK", dial_code: "+682", flag: "🇨🇰" },
    { name: "Costa Rica", code: "CR", dial_code: "+506", flag: "🇨🇷" },
    { name: "Croatia", code: "HR", dial_code: "+385", flag: "🇭🇷" },
    { name: "Cuba", code: "CU", dial_code: "+53", flag: "🇨🇺" },
    { name: "Curacao", code: "CW", dial_code: "+599", flag: "🇨🇼" },
    { name: "Cyprus", code: "CY", dial_code: "+357", flag: "🇨🇾" },
    { name: "Czech Republic", code: "CZ", dial_code: "+420", flag: "🇨🇿" },
    { name: "DR Congo", code: "CD", dial_code: "+243", flag: "🇨🇩" },
    { name: "Denmark", code: "DK", dial_code: "+45", flag: "🇩🇰" },
    { name: "Djibouti", code: "DJ", dial_code: "+253", flag: "🇩🇯" },
    { name: "Dominica", code: "DM", dial_code: "+1767", flag: "🇩🇲" },
    { name: "Dominican Republic", code: "DO", dial_code: "+1809", flag: "🇩🇴" },
    { name: "East Timor", code: "TL", dial_code: "+670", flag: "🇹🇱" },
    { name: "Ecuador", code: "EC", dial_code: "+593", flag: "🇪🇨" },
    { name: "Egypt", code: "EG", dial_code: "+20", flag: "🇪🇬" },
    { name: "El Salvador", code: "SV", dial_code: "+503", flag: "🇸🇻" },
    { name: "Equatorial Guinea", code: "GQ", dial_code: "+240", flag: "🇬🇶" },
    { name: "Eritrea", code: "ER", dial_code: "+291", flag: "🇪🇷" },
    { name: "Estonia", code: "EE", dial_code: "+372", flag: "🇪🇪" },
    { name: "Ethiopia", code: "ET", dial_code: "+251", flag: "🇪🇹" },
    { name: "Falkland Islands", code: "FK", dial_code: "+500", flag: "🇫🇰" },
    { name: "Faroe Islands", code: "FO", dial_code: "+298", flag: "🇫🇴" },
    { name: "Fiji", code: "FJ", dial_code: "+679", flag: "🇫🇯" },
    { name: "Finland", code: "FI", dial_code: "+358", flag: "🇫🇮" },
    { name: "France", code: "FR", dial_code: "+33", flag: "🇫🇷" },
    { name: "French Guiana", code: "GF", dial_code: "+594", flag: "🇬🇫" },
    { name: "French Polynesia", code: "PF", dial_code: "+689", flag: "🇵🇫" },
    { name: "Gabon", code: "GA", dial_code: "+241", flag: "🇬🇦" },
    { name: "Gambia", code: "GM", dial_code: "+220", flag: "🇬🇲" },
    { name: "Georgia", code: "GE", dial_code: "+995", flag: "🇬🇪" },
    { name: "Germany", code: "DE", dial_code: "+49", flag: "🇩🇪" },
    { name: "Ghana", code: "GH", dial_code: "+233", flag: "🇬🇭" },
    { name: "Gibraltar", code: "GI", dial_code: "+350", flag: "🇬🇮" },
    { name: "Greece", code: "GR", dial_code: "+30", flag: "🇬🇷" },
    { name: "Greenland", code: "GL", dial_code: "+299", flag: "🇬🇱" },
    { name: "Grenada", code: "GD", dial_code: "+1473", flag: "🇬🇩" },
    { name: "Guadeloupe", code: "GP", dial_code: "+590", flag: "🇬🇵" },
    { name: "Guam", code: "GU", dial_code: "+1671", flag: "🇬🇺" },
    { name: "Guatemala", code: "GT", dial_code: "+502", flag: "🇬🇹" },
    { name: "Guernsey", code: "GG", dial_code: "+44", flag: "🇬🇬" },
    { name: "Guinea", code: "GN", dial_code: "+224", flag: "🇬🇳" },
    { name: "Guinea-Bissau", code: "GW", dial_code: "+245", flag: "🇬🇼" },
    { name: "Guyana", code: "GY", dial_code: "+592", flag: "🇬🇾" },
    { name: "Haiti", code: "HT", dial_code: "+509", flag: "🇭🇹" },
    { name: "Honduras", code: "HN", dial_code: "+504", flag: "🇭🇳" },
    { name: "Hong Kong", code: "HK", dial_code: "+852", flag: "🇭🇰" },
    { name: "Hungary", code: "HU", dial_code: "+36", flag: "🇭🇺" },
    { name: "Iceland", code: "IS", dial_code: "+354", flag: "🇮🇸" },
    { name: "India", code: "IN", dial_code: "+91", flag: "🇮🇳" },
    { name: "Indonesia", code: "ID", dial_code: "+62", flag: "🇮🇩" },
    { name: "Iran", code: "IR", dial_code: "+98", flag: "🇮🇷" },
    { name: "Iraq", code: "IQ", dial_code: "+964", flag: "🇮🇶" },
    { name: "Ireland", code: "IE", dial_code: "+353", flag: "🇮🇪" },
    { name: "Isle of Man", code: "IM", dial_code: "+44", flag: "🇮🇲" },
    { name: "Israel", code: "IL", dial_code: "+972", flag: "🇮🇱" },
    { name: "Italy", code: "IT", dial_code: "+39", flag: "🇮🇹" },
    { name: "Ivory Coast", code: "CI", dial_code: "+225", flag: "🇨🇮" },
    { name: "Jamaica", code: "JM", dial_code: "+1876", flag: "🇯🇲" },
    { name: "Japan", code: "JP", dial_code: "+81", flag: "🇯🇵" },
    { name: "Jersey", code: "JE", dial_code: "+44", flag: "🇯🇪" },
    { name: "Jordan", code: "JO", dial_code: "+962", flag: "🇯🇴" },
    { name: "Kazakhstan", code: "KZ", dial_code: "+7", flag: "🇰🇿" },
    { name: "Kenya", code: "KE", dial_code: "+254", flag: "🇰🇪" },
    { name: "Kiribati", code: "KI", dial_code: "+686", flag: "🇰🇮" },
    { name: "Kosovo", code: "XK", dial_code: "+383", flag: "🇽🇰" },
    { name: "Kuwait", code: "KW", dial_code: "+965", flag: "🇰🇼" },
    { name: "Kyrgyzstan", code: "KG", dial_code: "+996", flag: "🇰🇬" },
    { name: "Laos", code: "LA", dial_code: "+856", flag: "🇱🇦" },
    { name: "Latvia", code: "LV", dial_code: "+371", flag: "🇱🇻" },
    { name: "Lebanon", code: "LB", dial_code: "+961", flag: "🇱🇧" },
    { name: "Lesotho", code: "LS", dial_code: "+266", flag: "🇱🇸" },
    { name: "Liberia", code: "LR", dial_code: "+231", flag: "🇱🇷" },
    { name: "Libya", code: "LY", dial_code: "+218", flag: "🇱🇾" },
    { name: "Liechtenstein", code: "LI", dial_code: "+423", flag: "🇱🇮" },
    { name: "Lithuania", code: "LT", dial_code: "+370", flag: "🇱🇹" },
    { name: "Luxembourg", code: "LU", dial_code: "+352", flag: "🇱🇺" },
    { name: "Macau", code: "MO", dial_code: "+853", flag: "🇲🇴" },
    { name: "Madagascar", code: "MG", dial_code: "+261", flag: "🇲🇬" },
    { name: "Malawi", code: "MW", dial_code: "+265", flag: "🇲🇼" },
    { name: "Malaysia", code: "MY", dial_code: "+60", flag: "🇲🇾" },
    { name: "Maldives", code: "MV", dial_code: "+960", flag: "🇲🇻" },
    { name: "Mali", code: "ML", dial_code: "+223", flag: "🇲🇱" },
    { name: "Malta", code: "MT", dial_code: "+356", flag: "🇲🇹" },
    { name: "Marshall Islands", code: "MH", dial_code: "+692", flag: "🇲🇭" },
    { name: "Martinique", code: "MQ", dial_code: "+596", flag: "🇲🇶" },
    { name: "Mauritania", code: "MR", dial_code: "+222", flag: "🇲🇷" },
    { name: "Mauritius", code: "MU", dial_code: "+230", flag: "🇲🇺" },
    { name: "Mayotte", code: "YT", dial_code: "+262", flag: "🇾🇹" },
    { name: "Mexico", code: "MX", dial_code: "+52", flag: "🇲🇽" },
    { name: "Micronesia", code: "FM", dial_code: "+691", flag: "🇫🇲" },
    { name: "Moldova", code: "MD", dial_code: "+373", flag: "🇲🇩" },
    { name: "Monaco", code: "MC", dial_code: "+377", flag: "🇲🇨" },
    { name: "Mongolia", code: "MN", dial_code: "+976", flag: "🇲🇳" },
    { name: "Montenegro", code: "ME", dial_code: "+382", flag: "🇲🇪" },
    { name: "Montserrat", code: "MS", dial_code: "+1664", flag: "🇲🇸" },
    { name: "Morocco", code: "MA", dial_code: "+212", flag: "🇲🇦" },
    { name: "Mozambique", code: "MZ", dial_code: "+258", flag: "🇲🇿" },
    { name: "Myanmar", code: "MM", dial_code: "+95", flag: "🇲🇲" },
    { name: "Namibia", code: "NA", dial_code: "+264", flag: "🇳🇦" },
    { name: "Nauru", code: "NR", dial_code: "+674", flag: "🇳🇷" },
    { name: "Nepal", code: "NP", dial_code: "+977", flag: "🇳🇵" },
    { name: "Netherlands", code: "NL", dial_code: "+31", flag: "🇳🇱" },
    { name: "New Caledonia", code: "NC", dial_code: "+687", flag: "🇳🇨" },
    { name: "New Zealand", code: "NZ", dial_code: "+64", flag: "🇳🇿" },
    { name: "Nicaragua", code: "NI", dial_code: "+505", flag: "🇳🇮" },
    { name: "Niger", code: "NE", dial_code: "+227", flag: "🇳🇪" },
    { name: "Nigeria", code: "NG", dial_code: "+234", flag: "🇳🇬" },
    { name: "Niue", code: "NU", dial_code: "+683", flag: "🇳🇺" },
    { name: "Norfolk Island", code: "NF", dial_code: "+672", flag: "🇳🇫" },
    { name: "North Korea", code: "KP", dial_code: "+850", flag: "🇰🇵" },
    { name: "North Macedonia", code: "MK", dial_code: "+389", flag: "🇲🇰" },
    { name: "Northern Mariana Islands", code: "MP", dial_code: "+1670", flag: "🇲🇵" },
    { name: "Norway", code: "NO", dial_code: "+47", flag: "🇳🇴" },
    { name: "Oman", code: "OM", dial_code: "+968", flag: "🇴🇲" },
    { name: "Pakistan", code: "PK", dial_code: "+92", flag: "🇵🇰" },
    { name: "Palau", code: "PW", dial_code: "+680", flag: "🇵🇼" },
    { name: "Palestine", code: "PS", dial_code: "+970", flag: "🇵🇸" },
    { name: "Panama", code: "PA", dial_code: "+507", flag: "🇵🇦" },
    { name: "Papua New Guinea", code: "PG", dial_code: "+675", flag: "🇵🇬" },
    { name: "Paraguay", code: "PY", dial_code: "+595", flag: "🇵🇾" },
    { name: "Peru", code: "PE", dial_code: "+51", flag: "🇵🇪" },
    { name: "Philippines", code: "PH", dial_code: "+63", flag: "🇵🇭" },
    { name: "Pitcairn", code: "PN", dial_code: "+64", flag: "🇵🇳" },
    { name: "Poland", code: "PL", dial_code: "+48", flag: "🇵🇱" },
    { name: "Portugal", code: "PT", dial_code: "+351", flag: "🇵🇹" },
    { name: "Puerto Rico", code: "PR", dial_code: "+1939", flag: "🇵🇷" },
    { name: "Qatar", code: "QA", dial_code: "+974", flag: "🇶🇦" },
    { name: "Congo", code: "CG", dial_code: "+242", flag: "🇨🇬" },
    { name: "Reunion", code: "RE", dial_code: "+262", flag: "🇷🇪" },
    { name: "Romania", code: "RO", dial_code: "+40", flag: "🇷🇴" },
    { name: "Russia", code: "RU", dial_code: "+7", flag: "🇷🇺" },
    { name: "Rwanda", code: "RW", dial_code: "+250", flag: "🇷🇼" },
    { name: "St Barthelemy", code: "BL", dial_code: "+590", flag: "🇧🇱" },
    { name: "St Helena", code: "SH", dial_code: "+290", flag: "🇸🇭" },
    { name: "St Kitts & Nevis", code: "KN", dial_code: "+1869", flag: "🇰🇳" },
    { name: "St Lucia", code: "LC", dial_code: "+1758", flag: "🇱🇨" },
    { name: "St Martin", code: "MF", dial_code: "+590", flag: "🇲🇫" },
    { name: "St Pierre & Miquelon", code: "PM", dial_code: "+508", flag: "🇵🇲" },
    { name: "St Vincent & Grenadines", code: "VC", dial_code: "+1784", flag: "🇻🇨" },
    { name: "Samoa", code: "WS", dial_code: "+685", flag: "🇼🇸" },
    { name: "San Marino", code: "SM", dial_code: "+378", flag: "🇸🇲" },
    { name: "Sao Tome & Principe", code: "ST", dial_code: "+239", flag: "🇸🇹" },
    { name: "Saudi Arabia", code: "SA", dial_code: "+966", flag: "🇸🇦" },
    { name: "Senegal", code: "SN", dial_code: "+221", flag: "🇸🇳" },
    { name: "Serbia", code: "RS", dial_code: "+381", flag: "🇷🇸" },
    { name: "Seychelles", code: "SC", dial_code: "+248", flag: "🇸🇨" },
    { name: "Sierra Leone", code: "SL", dial_code: "+232", flag: "🇸🇱" },
    { name: "Singapore", code: "SG", dial_code: "+65", flag: "🇸🇬" },
    { name: "Sint Maarten", code: "SX", dial_code: "+1721", flag: "🇸🇽" },
    { name: "Slovakia", code: "SK", dial_code: "+421", flag: "🇸🇰" },
    { name: "Slovenia", code: "SI", dial_code: "+386", flag: "🇸🇮" },
    { name: "Solomon Islands", code: "SB", dial_code: "+677", flag: "🇸🇧" },
    { name: "Somalia", code: "SO", dial_code: "+252", flag: "🇸🇴" },
    { name: "South Africa", code: "ZA", dial_code: "+27", flag: "🇿🇦" },
    { name: "South Korea", code: "KR", dial_code: "+82", flag: "🇰🇷" },
    { name: "South Sudan", code: "SS", dial_code: "+211", flag: "🇸🇸" },
    { name: "Spain", code: "ES", dial_code: "+34", flag: "🇪🇸" },
    { name: "Sri Lanka", code: "LK", dial_code: "+94", flag: "🇱🇰" },
    { name: "Sudan", code: "SD", dial_code: "+249", flag: "🇸🇩" },
    { name: "Suriname", code: "SR", dial_code: "+597", flag: "🇸🇷" },
    { name: "Svalbard", code: "SJ", dial_code: "+47", flag: "🇸🇯" },
    { name: "Eswatini", code: "SZ", dial_code: "+268", flag: "🇸🇿" },
    { name: "Sweden", code: "SE", dial_code: "+46", flag: "🇸🇪" },
    { name: "Switzerland", code: "CH", dial_code: "+41", flag: "🇨🇭" },
    { name: "Syria", code: "SY", dial_code: "+963", flag: "🇸🇾" },
    { name: "Taiwan", code: "TW", dial_code: "+886", flag: "🇹🇼" },
    { name: "Tajikistan", code: "TJ", dial_code: "+992", flag: "🇹🇯" },
    { name: "Tanzania", code: "TZ", dial_code: "+255", flag: "🇹🇿" },
    { name: "Thailand", code: "TH", dial_code: "+66", flag: "🇹🇭" },
    { name: "Togo", code: "TG", dial_code: "+228", flag: "🇹🇬" },
    { name: "Tokelau", code: "TK", dial_code: "+690", flag: "🇹🇰" },
    { name: "Tonga", code: "TO", dial_code: "+676", flag: "🇹🇴" },
    { name: "Trinidad & Tobago", code: "TT", dial_code: "+1868", flag: "🇹🇹" },
    { name: "Tunisia", code: "TN", dial_code: "+216", flag: "🇹🇳" },
    { name: "Turkey", code: "TR", dial_code: "+90", flag: "🇹🇷" },
    { name: "Turkmenistan", code: "TM", dial_code: "+993", flag: "🇹🇲" },
    { name: "Turks & Caicos", code: "TC", dial_code: "+1649", flag: "🇹🇨" },
    { name: "Tuvalu", code: "TV", dial_code: "+688", flag: "🇹🇻" },
    { name: "Uganda", code: "UG", dial_code: "+256", flag: "🇺🇬" },
    { name: "Ukraine", code: "UA", dial_code: "+380", flag: "🇺🇦" },
    { name: "UAE", code: "AE", dial_code: "+971", flag: "🇦🇪" },
    { name: "United Kingdom", code: "GB", dial_code: "+44", flag: "🇬🇧" },
    { name: "United States", code: "US", dial_code: "+1", flag: "🇺🇸" },
    { name: "Uruguay", code: "UY", dial_code: "+598", flag: "🇺🇾" },
    { name: "Uzbekistan", code: "UZ", dial_code: "+998", flag: "🇺🇿" },
    { name: "Vanuatu", code: "VU", dial_code: "+678", flag: "🇻🇺" },
    { name: "Vatican City", code: "VA", dial_code: "+39", flag: "🇻🇦" },
    { name: "Venezuela", code: "VE", dial_code: "+58", flag: "🇻🇪" },
    { name: "Vietnam", code: "VN", dial_code: "+84", flag: "🇻🇳" },
    { name: "Wallis & Futuna", code: "WF", dial_code: "+681", flag: "🇼🇫" },
    { name: "Yemen", code: "YE", dial_code: "+967", flag: "🇾🇪" },
    { name: "Zambia", code: "ZM", dial_code: "+260", flag: "🇿🇲" },
    { name: "Zimbabwe", code: "ZW", dial_code: "+263", flag: "🇿🇼" }
];

// --- STATE MANAGEMENT ---
let currentUser = null;
let currentView = 'guest';
let currentDashboardSection = 'home';
let userDocuments = [];
let userStatistics = {};
let isLoading = false;
let isEmailVerified = false;
// OTP is generated and stored server-side; not tracked in frontend

// --- UTILITY FUNCTIONS ---

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type of toast (success, error, info)
 */
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');

    let icon = '';
    let colorClass = '';

    if (type === 'success') {
        icon = '<svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
        colorClass = 'border-l-4 border-green-500';
    } else if (type === 'error') {
        icon = '<svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
        colorClass = 'border-l-4 border-red-500';
    } else {
        icon = '<svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
        colorClass = 'border-l-4 border-blue-500';
    }

    toast.className = `toast flex items-center w-full max-w-sm p-4 text-slate-600 bg-white rounded-lg shadow-lg pointer-events-auto transform transition-all duration-300 ${colorClass}`;
    toast.innerHTML = `
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg">
            ${icon}
        </div>
        <div class="ml-3 text-sm font-normal">${message}</div>
    `;

    container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Remove after 4.5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4500);
}

/**
 * Toggle loading overlay
 * @param {boolean} show - Whether to show or hide loading
 */
function toggleLoading(show) {
    const overlay = document.getElementById('loading-overlay');
    if (show) {
        overlay.classList.remove('hidden');
        isLoading = true;
    } else {
        overlay.classList.add('hidden');
        isLoading = false;
    }
}

/**
 * Get user initials from full name
 * @param {string} name - Full name
 * @returns {string} Initials
 */
function getUserInitials(name) {
    if (!name) return 'U';
    return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

/**
 * Get greeting based on time of day
 * @returns {string} Greeting message
 */
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
}

/**
 * Format date for display
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date
 */
function formatDate(date) {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Get status color class
 * @param {string} status - Document status
 * @returns {string} CSS class
 */
function getStatusColor(status) {
    switch (status?.toLowerCase()) {
        case 'verified': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
        case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
        case 'pending': return 'text-orange-600 bg-orange-50 border-orange-200';
        default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
}

/**
 * Get status icon
 * @param {string} status - Document status
 * @returns {string} Icon emoji
 */
function getStatusIcon(status) {
    switch (status?.toLowerCase()) {
        case 'verified': return '✅';
        case 'rejected': return '❌';
        case 'pending': return '⏳';
        default: return '📄';
    }
}

/**
 * Toggle password visibility
 * @param {string} inputId - ID of password input
 */
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
}

/**
 * Send OTP to email via backend (Gmail)
 */
async function sendEmailOTP() {
    const emailInput = document.getElementById('signup-email');
    const email = emailInput.value;

    if (!email || !email.includes('@')) {
        showToast('Please enter a valid email address', 'error');
        return;
    }

    const btn = document.getElementById('verify-email-btn');
    btn.disabled = true;
    btn.textContent = 'Sending...';
    btn.classList.add('opacity-50', 'cursor-not-allowed');

    try {
        const response = await fetch(`${API_BASE_URL}/auth/send-email-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok) {
            // Show OTP input container
            document.getElementById('email-otp-container').classList.remove('hidden');
            btn.textContent = 'Sent';
            showToast(`Verification code sent to ${email}. Please check your inbox.`, 'success');
        } else {
            showToast(data.message || 'Failed to send verification code', 'error');
            // Re-enable button so user can retry
            btn.disabled = false;
            btn.textContent = 'Send OTP';
            btn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    } catch (error) {
        console.error('Send OTP error:', error);
        showToast('Network error. Could not send verification code.', 'error');
        btn.disabled = false;
        btn.textContent = 'Send OTP';
        btn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

// ============================================
// RESTORED FUNCTIONS
// ============================================

/**
 * Verify entered OTP via backend API
 */
async function verifyEmailOTP() {
    const emailInput = document.getElementById('signup-email');
    const input = document.getElementById('email-otp-input');
    const email = emailInput.value;
    const otp = input.value.trim();

    if (!otp) {
        showToast('Please enter the verification code', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/verify-email-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp })
        });

        const data = await response.json();

        if (response.ok) {
            isEmailVerified = true;
            document.getElementById('email-otp-container').classList.add('hidden');
            const btn = document.getElementById('verify-email-btn');
            btn.textContent = 'Verified ✓';
            btn.classList.remove('bg-slate-800', 'opacity-50', 'cursor-not-allowed');
            btn.classList.add('bg-green-600');
            document.getElementById('signup-email').readOnly = true;
            showToast('Email verified successfully!', 'success');
        } else {
            showToast(data.message || 'Invalid or expired verification code', 'error');
        }
    } catch (error) {
        console.error('Verify OTP error:', error);
        showToast('Network error. Could not verify code.', 'error');
    }
}

// --- NAVIGATION FUNCTIONS ---

/**
 * Show specific page
 * @param {string} pageId - ID of page to show
 */
function showPage(pageId) {
    // Hide all pages
    document.getElementById('guestPage').classList.add('hidden');
    document.getElementById('authPage').classList.add('hidden');
    document.getElementById('dashboard').classList.add('hidden');

    // Show requested page
    document.getElementById(pageId).classList.remove('hidden');
    currentView = pageId;

    // Load data if showing dashboard
    if (pageId === 'dashboard') {
        loadDashboardData();
    }
}

/**
 * Show authentication page
 * @param {string} tab - Tab to show (signin/signup)
 */
function showAuth(tab = 'signin') {
    showPage('authPage');
    switchAuthTab(tab);
}

/**
 * Switch authentication tab
 * @param {string} tab - Tab to switch to
 */
function switchAuthTab(tab) {
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');
    const signinTab = document.getElementById('auth-tab-signin');
    const signupTab = document.getElementById('auth-tab-signup');
    const errorDiv = document.getElementById('auth-error');

    // Reset error message
    errorDiv.classList.add('hidden');

    if (tab === 'signin') {
        signinForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        
        signinTab.classList.add('bg-white', 'text-brand-900', 'shadow-sm');
        signinTab.classList.remove('text-slate-500');
        
        signupTab.classList.remove('bg-white', 'text-brand-900', 'shadow-sm');
        signupTab.classList.add('text-slate-500');
    } else {
        signinForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        
        signupTab.classList.add('bg-white', 'text-brand-900', 'shadow-sm');
        signupTab.classList.remove('text-slate-500');
        
        signinTab.classList.remove('bg-white', 'text-brand-900', 'shadow-sm');
        signinTab.classList.add('text-slate-500');
    }
}

/**
 * Build and render all country rows into the dropdown list
 */
function populateCountryCodes() {
    const list = document.getElementById('country-list');
    if (!list) return;

    // Priority countries shown at top
    const priority = ['IN', 'US', 'GB', 'AE', 'CA', 'AU'];
    const ordered = [
        ...priority.map(c => COUNTRY_CODES.find(x => x.code === c)).filter(Boolean),
        ...COUNTRY_CODES.filter(x => !priority.includes(x.code))
    ];

    list.innerHTML = ordered.map(c => `
        <li>
            <button type="button"
                onclick="selectCountry('${c.dial_code}', '${c.flag}', '${c.name.replace(/'/g, "\\'")}')"
                class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-colors text-left"
                data-name="${c.name.toLowerCase()}" data-code="${c.dial_code}">
                <span class="text-lg">${c.flag}</span>
                <span class="flex-1 truncate">${c.name}</span>
                <span class="text-slate-400 font-mono text-xs">${c.dial_code}</span>
            </button>
        </li>`).join('');

    // Default selection: India
    selectCountry('+91', '🇮🇳', 'India');

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const picker = document.getElementById('country-picker');
        if (picker && !picker.contains(e.target)) {
            closeCountryDropdown();
        }
    });
}

/**
 * Toggle the country dropdown open/closed
 */
function toggleCountryDropdown() {
    const dropdown = document.getElementById('country-dropdown');
    const searchInput = document.getElementById('country-search');
    if (!dropdown) return;

    if (dropdown.classList.contains('hidden')) {
        dropdown.classList.remove('hidden');
        // Clear and focus search
        searchInput.value = '';
        filterCountries('');
        setTimeout(() => searchInput.focus(), 50);
    } else {
        closeCountryDropdown();
    }
}

/**
 * Close the country dropdown
 */
function closeCountryDropdown() {
    const dropdown = document.getElementById('country-dropdown');
    if (dropdown) dropdown.classList.add('hidden');
}

/**
 * Filter the country list based on search query
 * @param {string} query
 */
function filterCountries(query) {
    const q = query.toLowerCase().trim();
    const items = document.querySelectorAll('#country-list li button');
    let visibleCount = 0;

    items.forEach(btn => {
        const name = btn.dataset.name || '';
        const code = btn.dataset.code || '';
        const matches = !q || name.includes(q) || code.includes(q);
        btn.closest('li').style.display = matches ? '' : 'none';
        if (matches) visibleCount++;
    });

    // Show "no results" message if nothing matches
    const noResult = document.getElementById('country-no-result');
    if (visibleCount === 0 && !noResult) {
        const msg = document.createElement('li');
        msg.id = 'country-no-result';
        msg.className = 'px-4 py-3 text-sm text-slate-400 text-center';
        msg.textContent = 'No country found';
        document.getElementById('country-list').appendChild(msg);
    } else if (visibleCount > 0 && noResult) {
        noResult.remove();
    }
}

/**
 * Select a country from the dropdown and update the UI
 * @param {string} dialCode  e.g. "+91"
 * @param {string} flag      e.g. "🇮🇳"
 * @param {string} name      e.g. "India"
 */
function selectCountry(dialCode, flag, name) {
    // Update hidden field (used by handleSignup)
    const hidden = document.getElementById('country-code');
    if (hidden) hidden.value = dialCode;

    // Update button display
    const flagEl = document.getElementById('country-picker-flag');
    const codeEl = document.getElementById('country-picker-code');
    if (flagEl) flagEl.textContent = flag;
    if (codeEl) codeEl.textContent = dialCode;

    closeCountryDropdown();
}


function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        overlay.classList.add('hidden');
    } else {
        sidebar.classList.add('open');
        overlay.classList.remove('hidden');
    }
}

/**
 * Show dashboard section
 * @param {string} sectionId - Section to show
 */
function showDashboardSection(sectionId) {
    currentDashboardSection = sectionId;
    
    // Update header title
    const titles = {
        'home': 'Dashboard Overview',
        'inventory': 'Document Inventory',
        'analytics': 'Analytics Dashboard',
        'verify': 'Verify Document',
        'qrVerification': 'QR Scanner',
        'share': 'Share Document',
        'profile': 'My Profile',
        'settings': 'Settings'
    };
    
    document.getElementById('header-title').textContent = titles[sectionId] || 'Dashboard';
    
    // Update navigation active state
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('text-brand-700', 'bg-brand-50');
        btn.classList.add('text-slate-600', 'hover:bg-slate-50');
    });
    
    // Find and activate current nav item
    const currentNavItem = document.querySelector(`[onclick="showDashboardSection('${sectionId}')"]`);
    if (currentNavItem) {
        currentNavItem.classList.add('text-brand-700', 'bg-brand-50');
        currentNavItem.classList.remove('text-slate-600', 'hover:bg-slate-50');
    }
    
    // CRITICAL FIX: Reload data for sections that need fresh data
    if (sectionId === 'inventory' || sectionId === 'analytics' || sectionId === 'home') {
        // Show loading state for inventory
        if (sectionId === 'inventory') {
            const content = document.getElementById('dashboard-content');
            content.innerHTML = `
                <div class="flex items-center justify-center h-64">
                    <div class="text-center">
                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600 mx-auto mb-4"></div>
                        <p class="text-slate-600">Loading your documents...</p>
                    </div>
                </div>
            `;
        }
        
        // Load fresh data before showing the section
        loadDashboardData().then(() => {
            // Load section content after data is loaded
            loadDashboardSection(sectionId);
        }).catch(() => {
            // Load section content even if data loading fails
            loadDashboardSection(sectionId);
        });
    } else {
        // Load section content immediately for other sections
        loadDashboardSection(sectionId);
    }
    
    // Close sidebar on mobile
    if (window.innerWidth < 768) {
        toggleSidebar();
    }
}

// --- AUTHENTICATION FUNCTIONS ---

/**
 * Check password strength
 * @param {string} password 
 * @returns {boolean} valid
 */
function checkPasswordStrength(password) {
    const requirements = {
        length: password.length >= 6,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };

    const updateUI = (reqId, valid) => {
        const el = document.getElementById(reqId);
        if (!el) return;
        
        const dot = el.querySelector('span');
        if (valid) {
            el.classList.remove('text-slate-500');
            el.classList.add('text-green-600');
            dot.classList.remove('bg-slate-300');
            dot.classList.add('bg-green-600');
        } else {
            el.classList.add('text-slate-500');
            el.classList.remove('text-green-600');
            dot.classList.add('bg-slate-300');
            dot.classList.remove('bg-green-600');
        }
    };

    updateUI('req-length', requirements.length);
    updateUI('req-upper', requirements.upper);
    updateUI('req-lower', requirements.lower);
    updateUI('req-number', requirements.number);
    updateUI('req-special', requirements.special);

    return Object.values(requirements).every(Boolean);
}

/**
 * Handle user signup
 * @param {Event} e - Form submit event
 */
async function handleSignup(e) {
    e.preventDefault();
    toggleLoading(true);

    const formData = new FormData(e.target);

    // Validation
    const password = formData.get('password');
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    
    // Check password strength
    if (!checkPasswordStrength(password)) {
        showAuthError('Password does not meet connection requirements');
        toggleLoading(false);
        return;
    }

    if (password !== confirmPassword) {
        showAuthError('Passwords do not match');
        toggleLoading(false);
        return;
    }
    
    if (!isEmailVerified) {
        showAuthError('Please verify your email address first');
        toggleLoading(false);
        return;
    }

    // Construct full phone number
    const countryCode = document.getElementById('country-code').value;
    const phoneNumber = formData.get('phone');
    const fullPhone = `${countryCode} ${phoneNumber}`;

    const userData = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: fullPhone,
        password: password
    };

    try {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
            credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
            showToast('Account created successfully!', 'success');
            setTimeout(() => switchAuthTab('signin'), 1000);
        } else {
            showAuthError(data.message || 'Signup failed');
        }
    } catch (error) {
        console.error('Signup error:', error);
        showAuthError('Connection error. Please try again.');
    } finally {
        toggleLoading(false);
    }
}

/**
 * Handle user signin
 * @param {Event} e - Form submit event
 */
async function handleSignin(e) {
    e.preventDefault();
    toggleLoading(true);

    const formData = new FormData(e.target);
    const credentials = {
        email: formData.get('email'),
        password: formData.get('password')
    };

    try {
        const response = await fetch(`${API_BASE_URL}/auth/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
            credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
            currentUser = data.user;
            showToast(`Welcome back, ${data.user.fullName}!`, 'success');
            showPage('dashboard');
            showDashboardSection('home');
            updateUserInterface();
        } else {
            showAuthError(data.message || 'Invalid credentials');
        }
    } catch (error) {
        console.error('Signin error:', error);
        showAuthError('Connection error. Please try again.');
    } finally {
        toggleLoading(false);
    }
}

/**
 * Handle user logout
 */
async function handleLogout() {
    try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        
        currentUser = null;
        userDocuments = [];
        userStatistics = {};
        
        showToast('Logged out successfully', 'info');
        showPage('guestPage');
    } catch (error) {
        console.error('Logout error:', error);
        showToast('Logout failed', 'error');
    }
}

/**
 * Show authentication error
 * @param {string} message - Error message
 */
function showAuthError(message) {
    const errorDiv = document.getElementById('auth-error');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

// --- DATA LOADING FUNCTIONS ---

/**
 * Check authentication status on page load
 */
async function checkAuthStatus() {
    try {
        toggleLoading(true);
        const response = await fetch(`${API_BASE_URL}/profile`, {
            credentials: 'include'
        });

        if (response.ok) {
            currentUser = await response.json();
            showPage('dashboard');
            showDashboardSection('home');
            updateUserInterface();
        } else {
            showPage('guestPage');
        }
    } catch (error) {
        console.error('Auth check error:', error);
        showPage('guestPage');
    } finally {
        toggleLoading(false);
    }
}

/**
 * Refresh document inventory data
 */
async function refreshDocumentInventory() {
    try {
        // Load fresh documents
        const docsResponse = await fetch(`${API_BASE_URL}/documents`, {
            credentials: 'include'
        });
        
        if (docsResponse.ok) {
            userDocuments = await docsResponse.json();
            console.log('📊 Document inventory refreshed:', userDocuments.length, 'documents');
            
            // If currently viewing inventory, refresh the display
            if (currentDashboardSection === 'inventory') {
                loadDashboardSection('inventory');
            }
        }
    } catch (error) {
        console.error('Error refreshing document inventory:', error);
    }
}

/**
 * Load dashboard data
 */
async function loadDashboardData() {
    if (!currentUser) return;
    
    try {
        // Load statistics
        const statsResponse = await fetch(`${API_BASE_URL}/stats`, {
            credentials: 'include'
        });
        
        if (statsResponse.ok) {
            userStatistics = await statsResponse.json();
        }
        
        // Load documents
        const docsResponse = await fetch(`${API_BASE_URL}/documents`, {
            credentials: 'include'
        });
        
        if (docsResponse.ok) {
            userDocuments = await docsResponse.json();
        }
        
        // Update current section
        loadDashboardSection(currentDashboardSection);
        
    } catch (error) {
        console.error('Dashboard data loading error:', error);
        showToast('Failed to load dashboard data', 'error');
    }
}

/**
 * Update user interface with current user data
 */
function updateUserInterface() {
    if (!currentUser) return;
    
    // Update user name displays
    const userName = document.getElementById('user-name');
    const userAvatar = document.getElementById('user-avatar');
    const sidebarTitle = document.getElementById('sidebar-title');
    const mobilePortalTitle = document.getElementById('mobile-portal-title');
    
    if (userName) userName.textContent = currentUser.fullName || 'User';
    if (userAvatar) userAvatar.textContent = getUserInitials(currentUser.fullName);
    if (sidebarTitle) sidebarTitle.textContent = `${currentUser.fullName?.split(' ')[0] || 'My'}'s Portal`;
    if (mobilePortalTitle) mobilePortalTitle.textContent = `${currentUser.fullName?.split(' ')[0] || 'User'} Portal`;
    
    // Update wallet status
    const walletStatus = document.getElementById('wallet-status');
    const userStatus = document.getElementById('user-status');
    
    if (currentUser.walletAddress) {
        if (walletStatus) {
            walletStatus.className = 'hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full';
            walletStatus.innerHTML = `
                <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span class="text-xs font-medium text-emerald-700">${currentUser.walletAddress.slice(0, 6)}...${currentUser.walletAddress.slice(-4)}</span>
            `;
        }
        if (userStatus) userStatus.textContent = 'Wallet Connected';
    } else {
        if (userStatus) userStatus.textContent = 'Authorized User';
    }
}

// --- DASHBOARD SECTION LOADING ---

/**
 * Load specific dashboard section content
 * @param {string} sectionId - Section to load
 */
function loadDashboardSection(sectionId) {
    const content = document.getElementById('dashboard-content');
    
    switch (sectionId) {
        case 'home':
            content.innerHTML = getDashboardOverviewHTML();
            break;
        case 'inventory':
            content.innerHTML = getDocumentInventoryHTML();
            break;
        case 'analytics':
            content.innerHTML = getAnalyticsDashboardHTML();
            loadAnalyticsCharts();
            break;
        case 'verify':
            content.innerHTML = getDocumentVerificationHTML();
            setupDocumentVerification();
            break;
        case 'qrVerification':
            content.innerHTML = getQRScannerHTML();
            setupQRScanner();
            break;
        case 'profile':
            content.innerHTML = getUserProfileHTML();
            setupUserProfile();
            break;
        case 'settings':
            content.innerHTML = getSettingsHTML();
            break;
        case 'share':
            content.innerHTML = getShareDocumentHTML();
            setupShareDocument();
            break;
        default:
            content.innerHTML = getDashboardOverviewHTML();
    }
}

// --- HTML TEMPLATE FUNCTIONS ---

/**
 * Get dashboard overview HTML
 * @returns {string} HTML content
 */
function getDashboardOverviewHTML() {
    const stats = userStatistics;
    const greeting = getGreeting();
    const firstName = currentUser?.fullName?.split(' ')[0] || 'User';
    
    return `
        <div class="space-y-8">
            <!-- Welcome Header -->
            <div class="bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl p-8 text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-3xl font-bold mb-2">
                            ${greeting}, ${firstName}! 👋
                        </h1>
                        <p class="text-brand-100 text-lg">
                            Welcome to your personal document management portal
                        </p>
                    </div>
                    <div class="hidden md:block text-6xl opacity-20">
                        📄
                    </div>
                </div>
            </div>

            <!-- Quick Stats -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-slate-500 text-sm font-medium mb-1">Total Documents</p>
                            <h3 class="text-3xl font-bold text-slate-800">
                                ${stats?.totalDocuments || stats?.totalVerified || 0}
                            </h3>
                        </div>
                        <div class="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl">
                            📋
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-slate-500 text-sm font-medium mb-1">Verified</p>
                            <h3 class="text-3xl font-bold text-emerald-600">
                                ${stats?.verifiedDocuments || stats?.successfulVerifications || 0}
                            </h3>
                        </div>
                        <div class="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-2xl">
                            ✅
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-slate-500 text-sm font-medium mb-1">Rejected</p>
                            <h3 class="text-3xl font-bold text-red-600">
                                ${stats?.rejectedDocuments || 0}
                            </h3>
                        </div>
                        <div class="h-12 w-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center text-2xl">
                            ❌
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-slate-500 text-sm font-medium mb-1">Success Rate</p>
                            <h3 class="text-3xl font-bold text-brand-600">
                                ${stats?.successRate || 0}%
                            </h3>
                        </div>
                        <div class="h-12 w-12 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center text-2xl">
                            📈
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div>
                <h3 class="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 action-grid">
                    <button onclick="showDashboardSection('inventory')" class="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-brand-300 hover:shadow-md transition-all text-left">
                        <div class="flex items-center justify-between mb-4">
                            <div class="h-12 w-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-2xl">
                                📂
                            </div>
                            <svg class="w-5 h-5 text-slate-400 group-hover:text-brand-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </div>
                        <h4 class="font-semibold text-slate-800 group-hover:text-brand-700 transition-colors">
                            Document Inventory
                        </h4>
                        <p class="text-sm text-slate-500 mt-1">
                            View and manage all your documents
                        </p>
                    </button>

                    <button onclick="showDashboardSection('analytics')" class="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-brand-300 hover:shadow-md transition-all text-left">
                        <div class="flex items-center justify-between mb-4">
                            <div class="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl">
                                📊
                            </div>
                            <svg class="w-5 h-5 text-slate-400 group-hover:text-brand-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </div>
                        <h4 class="font-semibold text-slate-800 group-hover:text-brand-700 transition-colors">
                            Analytics Dashboard
                        </h4>
                        <p class="text-sm text-slate-500 mt-1">
                            View insights and statistics
                        </p>
                    </button>

                    <button onclick="showDashboardSection('verify')" class="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-brand-300 hover:shadow-md transition-all text-left">
                        <div class="flex items-center justify-between mb-4">
                            <div class="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-2xl">
                                🔍
                            </div>
                            <svg class="w-5 h-5 text-slate-400 group-hover:text-brand-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </div>
                        <h4 class="font-semibold text-slate-800 group-hover:text-brand-700 transition-colors">
                            Verify Document
                        </h4>
                        <p class="text-sm text-slate-500 mt-1">
                            Upload and verify new documents
                        </p>
                    </button>

                    <button onclick="showDashboardSection('qrVerification')" class="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-brand-300 hover:shadow-md transition-all text-left">
                        <div class="flex items-center justify-between mb-4">
                            <div class="h-12 w-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center text-2xl">
                                📱
                            </div>
                            <svg class="w-5 h-5 text-slate-400 group-hover:text-brand-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </div>
                        <h4 class="font-semibold text-slate-800 group-hover:text-brand-700 transition-colors">
                            QR Scanner
                        </h4>
                        <p class="text-sm text-slate-500 mt-1">
                            Scan QR codes to verify documents
                        </p>
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Get document inventory HTML
 * @returns {string} HTML content
 */
function getDocumentInventoryHTML() {
    const docs = userDocuments || [];
    const statusCounts = {
        total: docs.length,
        verified: docs.filter(doc => doc.status === 'Verified').length,
        rejected: docs.filter(doc => doc.status === 'Rejected').length,
        pending: docs.filter(doc => doc.status === 'Pending').length,
        ipfsStored: docs.filter(doc => doc.documentCID).length
    };

    return `
        <div class="space-y-6">
            <!-- Header -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 class="text-3xl font-bold text-slate-800 flex items-center gap-3">
                        📂 Document Inventory
                    </h1>
                    <p class="text-slate-600 mt-1">
                        Manage and access your verified documents securely
                    </p>
                </div>
                
                <button onclick="loadDashboardData()" class="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    Refresh
                </button>
            </div>

            <!-- Status Overview Cards -->
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 stat-grid">
                <div class="bg-white p-4 rounded-xl border border-slate-200 hover:shadow-md transition-shadow stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-slate-600 text-sm font-medium">Total</p>
                            <p class="text-2xl font-bold text-slate-700">${statusCounts.total}</p>
                        </div>
                        <div class="text-2xl">📄</div>
                    </div>
                </div>
                <div class="bg-white p-4 rounded-xl border border-emerald-200 hover:shadow-md transition-shadow stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-emerald-600 text-sm font-medium">Verified</p>
                            <p class="text-2xl font-bold text-emerald-700">${statusCounts.verified}</p>
                        </div>
                        <div class="text-2xl">✅</div>
                    </div>
                </div>
                <div class="bg-white p-4 rounded-xl border border-red-200 hover:shadow-md transition-shadow stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-red-600 text-sm font-medium">Rejected</p>
                            <p class="text-2xl font-bold text-red-700">${statusCounts.rejected}</p>
                        </div>
                        <div class="text-2xl">❌</div>
                    </div>
                </div>
                <div class="bg-white p-4 rounded-xl border border-orange-200 hover:shadow-md transition-shadow stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-orange-600 text-sm font-medium">Pending</p>
                            <p class="text-2xl font-bold text-orange-700">${statusCounts.pending}</p>
                        </div>
                        <div class="text-2xl">⏳</div>
                    </div>
                </div>
                <div class="bg-white p-4 rounded-xl border border-blue-200 hover:shadow-md transition-shadow stat-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-blue-600 text-sm font-medium">IPFS Stored</p>
                            <p class="text-2xl font-bold text-blue-700">${statusCounts.ipfsStored}</p>
                        </div>
                        <div class="text-2xl">🌐</div>
                    </div>
                </div>
            </div>

            <!-- Document List -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div class="p-6 border-b border-slate-100">
                    <h3 class="text-lg font-semibold text-slate-800">Your Documents</h3>
                    <p class="text-sm text-slate-500 mt-1">Click on any document to view details</p>
                </div>
                
                <div class="divide-y divide-slate-100">
                    ${docs.length === 0 ? `
                        <div class="p-8 text-center">
                            <div class="text-6xl mb-4">📄</div>
                            <h3 class="text-lg font-semibold text-slate-800 mb-2">No documents found</h3>
                            <p class="text-slate-500 mb-4">Start by verifying your first document</p>
                            <button onclick="showDashboardSection('verify')" class="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-lg transition-colors">
                                Verify Document
                            </button>
                        </div>
                    ` : docs.map(doc => `
                        <div class="p-6 hover:bg-slate-50 transition-colors document-card ${doc.status === 'Rejected' ? '' : 'cursor-pointer'}" onclick="${doc.status === 'Rejected' ? `showToast('This document has been rejected', 'error')` : `viewDocument('${doc.id}')`}">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-4">
                                    <div class="text-3xl">${getStatusIcon(doc.status)}</div>
                                    <div>
                                        <h4 class="font-semibold text-slate-800">${doc.name || 'Untitled Document'}</h4>
                                        <p class="text-sm text-slate-500">Type: ${doc.docType || 'Unknown'} • Number: ${doc.docNumber || 'N/A'}</p>
                                        <p class="text-xs text-slate-400">Uploaded: ${formatDate(doc.uploadDate)}</p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}">
                                        ${doc.status || 'Unknown'}
                                    </span>
                                    ${doc.documentCID ? `
                                        <p class="text-xs text-slate-400 mt-1">IPFS: ${doc.documentCID.substring(0, 10)}...</p>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

/**
 * Get analytics dashboard HTML
 * @returns {string} HTML content
 */
function getAnalyticsDashboardHTML() {
    const stats = userStatistics;
    
    return `
        <div class="space-y-6">
            <!-- Header -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 class="text-3xl font-bold text-slate-800 flex items-center gap-3">
                        📊 Analytics Dashboard
                    </h1>
                    <p class="text-slate-600 mt-1">
                        Real-time insights into your document verification activities
                    </p>
                </div>
                
                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2">
                        <button
                            onclick="toggleAutoRefresh()"
                            id="auto-refresh-toggle"
                            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-brand-600"
                        >
                            <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
                        </button>
                        <span class="text-sm text-slate-600">Auto-refresh</span>
                    </div>
                    
                    <button onclick="loadDashboardData()" class="flex items-center gap-2 px-3 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                        Refresh
                    </button>
                </div>
            </div>

            <!-- Statistics Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-slate-500 text-sm font-medium mb-1">Total Documents</p>
                            <h3 class="text-3xl font-bold text-slate-800">
                                ${stats?.totalDocuments || userDocuments.length || 0}
                            </h3>
                        </div>
                        <div class="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl">
                            📋
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-slate-500 text-sm font-medium mb-1">Verified</p>
                            <h3 class="text-3xl font-bold text-emerald-600">
                                ${stats?.verifiedDocuments || userDocuments.filter(doc => doc.status === 'Verified').length || 0}
                            </h3>
                        </div>
                        <div class="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-2xl">
                            ✅
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-slate-500 text-sm font-medium mb-1">Success Rate</p>
                            <h3 class="text-3xl font-bold text-brand-600">
                                ${stats?.successRate || 0}%
                            </h3>
                        </div>
                        <div class="h-12 w-12 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center text-2xl">
                            📈
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-slate-500 text-sm font-medium mb-1">IPFS Stored</p>
                            <h3 class="text-3xl font-bold text-purple-600">
                                ${stats?.ipfsUploads || userDocuments.filter(doc => doc.documentCID).length || 0}
                            </h3>
                        </div>
                        <div class="h-12 w-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-2xl">
                            🌐
                        </div>
                    </div>
                </div>
            </div>

            <!-- Charts -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 class="text-lg font-semibold text-slate-800 mb-4">Document Status Distribution</h3>
                    <div class="relative h-64">
                        <canvas id="status-chart"></canvas>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 class="text-lg font-semibold text-slate-800 mb-4">Document Types</h3>
                    <div class="relative h-64">
                        <canvas id="types-chart"></canvas>
                    </div>
                </div>
            </div>

            <!-- Activity Feed -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100">
                <div class="p-6 border-b border-slate-100">
                    <h3 class="text-lg font-semibold text-slate-800">Recent Activity</h3>
                </div>
                <div class="divide-y divide-slate-100">
                    ${userDocuments.slice(0, 5).map(doc => `
                        <div class="p-6 hover:bg-slate-50 transition-colors">
                            <div class="flex items-center gap-4">
                                <div class="text-2xl">${getStatusIcon(doc.status)}</div>
                                <div class="flex-1">
                                    <p class="font-medium text-slate-800">
                                        ${doc.status === 'Verified' ? 'Verified' : 'Uploaded'} ${doc.docType || 'Document'}
                                    </p>
                                    <p class="text-sm text-slate-500">
                                        ${doc.docNumber || 'No reference number'} • ${formatDate(doc.uploadDate)}
                                    </p>
                                </div>
                                <span class="text-xs text-slate-400">
                                    ${formatDate(doc.uploadDate)}
                                </span>
                            </div>
                        </div>
                    `).join('') || `
                        <div class="p-8 text-center">
                            <div class="text-4xl mb-2">📊</div>
                            <p class="text-slate-500">No recent activity</p>
                        </div>
                    `}
                </div>
            </div>
        </div>
    `;
}

/**
 * Get document verification HTML
 * @returns {string} HTML content
 */
function getDocumentVerificationHTML() {
    return `
        <div class="max-w-2xl mx-auto space-y-6">
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <div class="text-center mb-8">
                    <h3 class="text-2xl font-bold text-slate-800">Verify Document</h3>
                    <p class="text-slate-500 mt-2">
                        Upload your document to verify its authenticity on the blockchain
                    </p>
                </div>

                <form id="verification-form" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-2">
                                Document Type
                            </label>
                            <select
                                name="docType"
                                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                                required
                            >
                                <option value="Birth Certificate">Birth Certificate</option>
                                <option value="Educational Certificate">Educational Certificate</option>
                                <option value="Property Document">Property Document</option>
                                <option value="Identity Document">Identity Document</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-2">
                                Reference Number
                            </label>
                            <input
                                type="text"
                                name="docNumber"
                                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                                placeholder="e.g. BC-2023-001"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-2">
                            Upload Document
                        </label>
                        <label
                            for="document-file"
                            class="group relative flex flex-col items-center justify-center w-full h-48 border-2 border-slate-300 border-dashed rounded-2xl cursor-pointer bg-slate-50 hover:bg-brand-50 hover:border-brand-400 transition-all"
                        >
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg class="w-10 h-10 mb-3 text-slate-400 group-hover:text-brand-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                </svg>
                                <p class="mb-2 text-sm text-slate-500 font-medium">
                                    <span class="font-bold text-brand-600">Click to upload</span> or drag and drop
                                </p>
                                <p class="text-xs text-slate-400">PDF, PNG, JPG (MAX. 5MB)</p>
                            </div>
                            <input
                                id="document-file"
                                type="file"
                                class="hidden"
                                accept=".pdf,.jpg,.png"
                                required
                            />
                        </label>
                        
                        <div id="selected-file" class="mt-2 text-sm text-slate-600 font-medium hidden">
                            <div class="flex items-center gap-2">
                                <svg class="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                <span id="file-name"></span>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        id="verify-button"
                        class="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-500/30 transition-all disabled:opacity-50"
                    >
                        Securely Verify Document
                    </button>
                </form>

                <div id="verification-result" class="mt-6 hidden"></div>
            </div>
        </div>
    `;
}

/**
 * Get QR scanner HTML
 * @returns {string} HTML content
 */
function getQRScannerHTML() {
    return `
        <div class="max-w-2xl mx-auto">
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <div class="text-center mb-6">
                    <h3 class="text-2xl font-bold text-slate-800">QR Code Scanner</h3>
                    <p class="text-slate-500 mt-2">
                        Scan a document QR code to validate its integrity
                    </p>
                </div>

                <div class="space-y-6">
                    <div id="qr-reader-hidden" class="hidden"></div>
                    <div class="relative overflow-hidden rounded-xl bg-black aspect-video flex items-center justify-center">
                        <div id="qr-camera-view" class="text-white text-center">
                            <div class="text-4xl mb-4">📱</div>
                            <p>Camera is off</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <button
                            onclick="toggleQRCamera()"
                            id="camera-toggle"
                            class="bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl transition-colors"
                        >
                            Start Camera
                        </button>
                        
                        <button
                            onclick="document.getElementById('qr-file-input').click()"
                            id="upload-qr-button"
                            class="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition-colors"
                        >
                            Upload QR Image
                        </button>
                        <input
                            id="qr-file-input"
                            type="file"
                            accept="image/*"
                            class="hidden"
                        />
                    </div>

                    <div id="qr-error" class="hidden bg-red-50 border border-red-200 rounded-xl p-4 text-red-700"></div>
                    <div id="qr-result" class="hidden bg-slate-50 border border-slate-200 rounded-xl p-6"></div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Get user profile HTML
 * @returns {string} HTML content
 */
function getUserProfileHTML() {
    const user = currentUser;
    
    return `
        <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <!-- Header -->
                <div class="bg-brand-900 h-32 relative">
                    <div class="absolute inset-0 bg-hero-pattern opacity-20 bg-cover bg-center"></div>
                </div>
                
                <div class="px-8 pb-8">
                    <div class="relative flex justify-between items-end -mt-12 mb-6">
                        <div class="h-24 w-24 bg-white p-1 rounded-full shadow-lg">
                            <div class="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-4xl">
                                👤
                            </div>
                        </div>
                    </div>

                    <div class="grid md:grid-cols-2 gap-12">
                        <!-- Profile Info -->
                        <div>
                            <h3 class="text-3xl font-bold text-slate-800">
                                ${user?.fullName || 'User'}
                            </h3>
                            <p class="text-slate-500 mb-4">${user?.email || 'user@example.com'}</p>
                            
                            <div class="space-y-4">
                                <div>
                                    <label class="text-xs text-slate-500 uppercase tracking-wider">Phone</label>
                                    <p class="text-sm text-slate-800">${user?.phone || 'Not provided'}</p>
                                </div>
                                
                                <div>
                                    <label class="text-xs text-slate-500 uppercase tracking-wider">Wallet Status</label>
                                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                        user?.walletAddress 
                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                            : 'bg-orange-50 text-orange-700 border border-orange-100'
                                    }">
                                        <span class="w-2 h-2 rounded-full ${
                                            user?.walletAddress ? 'bg-emerald-500' : 'bg-orange-500'
                                        }"></span>
                                        ${user?.walletAddress ? 'Wallet Linked' : 'Wallet Not Linked'}
                                    </div>
                                    ${user?.walletAddress ? `
                                        <p class="text-xs text-slate-400 font-mono mt-2 break-all">
                                            ${user.walletAddress}
                                        </p>
                                    ` : `
                                        <div class="mt-3">
                                            <button
                                                onclick="linkWallet()"
                                                id="link-wallet-button"
                                                class="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-lg transition-colors"
                                            >
                                                🔗 Link MetaMask Wallet
                                            </button>
                                            <p class="text-xs text-slate-500 mt-2">
                                                Link your MetaMask wallet to verify documents and access secure features.
                                            </p>
                                        </div>
                                    `}
                                </div>
                            </div>
                        </div>

                        <!-- Edit Form -->
                        <div>
                            <form id="profile-form" class="space-y-4">
                                <h4 class="text-lg font-bold text-slate-800 border-b pb-2">
                                    Edit Profile
                                </h4>
                                
                                <div id="profile-message" class="hidden p-3 rounded-lg text-sm"></div>

                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-xs font-semibold text-slate-500 mb-1">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value="${user?.fullName || ''}"
                                            class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label class="block text-xs font-semibold text-slate-500 mb-1">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value="${user?.phone || ''}"
                                            class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label class="block text-xs font-semibold text-slate-500 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value="${user?.email || ''}"
                                        class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                                        required
                                    />
                                </div>
                                
                                <button
                                    type="submit"
                                    id="save-profile-button"
                                    class="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-2.5 rounded-lg transition-colors"
                                >
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Get settings HTML
 * @returns {string} HTML content
 */
function getSettingsHTML() {
    return `
        <div class="max-w-4xl mx-auto space-y-6">
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h3 class="text-2xl font-bold text-slate-800 mb-6">Settings</h3>
                
                <div class="space-y-8">
                    <!-- Account Settings -->
                    <div>
                        <h4 class="text-lg font-semibold text-slate-800 mb-4">Account Settings</h4>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                <div>
                                    <p class="font-medium text-slate-800">Email Notifications</p>
                                    <p class="text-sm text-slate-500">Receive updates about your documents</p>
                                </div>
                                <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-brand-600 transition-colors">
                                    <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
                                </button>
                            </div>
                            
                            <div class="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                <div>
                                    <p class="font-medium text-slate-800">Two-Factor Authentication</p>
                                    <p class="text-sm text-slate-500">Add an extra layer of security</p>
                                </div>
                                <button class="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors">
                                    Enable
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Privacy Settings -->
                    <div>
                        <h4 class="text-lg font-semibold text-slate-800 mb-4">Privacy Settings</h4>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                <div>
                                    <p class="font-medium text-slate-800">Data Analytics</p>
                                    <p class="text-sm text-slate-500">Help improve our service</p>
                                </div>
                                <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-300 transition-colors">
                                    <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1"></span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Danger Zone -->
                    <div>
                        <h4 class="text-lg font-semibold text-red-600 mb-4">Danger Zone</h4>
                        <div class="p-4 border border-red-200 rounded-lg bg-red-50">
                            <p class="font-medium text-red-800 mb-2">Delete Account</p>
                            <p class="text-sm text-red-600 mb-4">
                                Permanently delete your account and all associated data. This action cannot be undone.
                            </p>
                            <button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// --- SETUP FUNCTIONS ---

/**
 * Setup document verification functionality
 */
function setupDocumentVerification() {
    const form = document.getElementById('verification-form');
    const fileInput = document.getElementById('document-file');
    const selectedFileDiv = document.getElementById('selected-file');
    const fileNameSpan = document.getElementById('file-name');
    const resultDiv = document.getElementById('verification-result');

    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                selectedFileDiv.classList.remove('hidden');
                fileNameSpan.textContent = file.name;
            } else {
                selectedFileDiv.classList.add('hidden');
            }
        });
    }

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const file = fileInput.files[0];
            
            if (!file) {
                showToast('Please select a file', 'error');
                return;
            }
            
            formData.append('document', file);
            
            toggleLoading(true);
            resultDiv.classList.add('hidden');
            
            try {
                const response = await fetch(`${API_BASE_URL}/verify`, {
                    method: 'POST',
                    body: formData,
                    credentials: 'include'
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    resultDiv.className = 'mt-6 p-4 rounded-xl border border-green-200 bg-green-50 text-green-700';
                    resultDiv.innerHTML = `
                        <div>
                            <p><strong>✅ Document Verified Successfully!</strong></p>
                            <p class="text-sm mt-2">Hash: ${result.fileHash?.substring(0, 20)}...</p>
                            ${result.documentCID ? `<p class="text-sm mt-1">IPFS CID: ${result.documentCID.substring(0, 20)}...</p>` : ''}
                            ${result.transactionHash ? `<p class="text-sm mt-1">Blockchain TX: ${result.transactionHash.substring(0, 20)}...</p>` : ''}
                            ${result.qrCodeDataUrl ? `
                                <div class="mt-4 text-center">
                                    <img src="${result.qrCodeDataUrl}" alt="QR Code" class="mx-auto w-32 h-32" />
                                    <p class="text-sm mt-2">QR Code for verification</p>
                                </div>
                            ` : ''}
                            <div class="mt-4 flex gap-3">
                                <button
                                    onclick="showDashboardSection('inventory')"
                                    class="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                                >
                                    View My Documents
                                </button>
                                <button
                                    onclick="document.getElementById('verification-result').classList.add('hidden'); document.getElementById('verification-form').reset(); document.getElementById('selected-file').classList.add('hidden');"
                                    class="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-lg transition-all"
                                >
                                    Verify Another
                                </button>
                            </div>
                        </div>
                    `;
                    showToast('Document verified successfully!', 'success');
                    
                    // CRITICAL FIX: Refresh document inventory after successful verification
                    refreshDocumentInventory();
                } else {
                    resultDiv.className = 'mt-6 p-4 rounded-xl border border-red-200 bg-red-50 text-red-700';
                    resultDiv.innerHTML = `<p><strong>❌ Verification Failed:</strong> ${result.message || result.error}</p>`;
                    showToast('Verification failed', 'error');
                }
                
                resultDiv.classList.remove('hidden');
                
            } catch (error) {
                console.error('Verification error:', error);
                resultDiv.className = 'mt-6 p-4 rounded-xl border border-red-200 bg-red-50 text-red-700';
                resultDiv.innerHTML = `<p><strong>❌ Verification Failed:</strong> Connection error. Please try again.</p>`;
                resultDiv.classList.remove('hidden');
                showToast('Connection error', 'error');
            } finally {
                toggleLoading(false);
            }
        });
    }
}

/**
 * Setup QR scanner functionality
 */
function setupQRScanner() {
    const fileInput = document.getElementById('qr-file-input');
    const errorDiv = document.getElementById('qr-error');
    const resultDiv = document.getElementById('qr-result');
    
    if (fileInput) {
        fileInput.addEventListener('change', async function(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            toggleLoading(true);
            errorDiv.classList.add('hidden');
            resultDiv.classList.add('hidden');
            
            try {
                // Initialize Html5Qrcode
                // @ts-ignore - Global variable from script tag
                const html5QrCode = new Html5Qrcode("qr-reader-hidden");
                
                // Scan file
                const qrCodeMessage = await html5QrCode.scanFile(file, true);
                console.log('QR Code detected:', qrCodeMessage);
                
                if (qrCodeMessage) {
                    await processQRCode(qrCodeMessage);
                } else {
                    showQRError('No QR code found in image');
                }
                
                // Cleanup
                try {
                    await html5QrCode.clear();
                } catch (e) {
                    // Ignore clear errors
                }
            } catch (error) {
                console.error('QR Scan error:', error);
                showQRError('Failed to read QR code. Please ensure the image is clear.');
            } finally {
                toggleLoading(false);
            }
        });
    }
}

/**
 * Process QR code data
 * @param {string} qrData - QR code data
 */
async function processQRCode(qrData) {
    try {
        const url = new URL(qrData);
        const qrId = url.searchParams.get('id');
        
        if (!qrId) {
            showQRError('Invalid QR code format');
            return;
        }
        
        const response = await fetch(`${API_BASE_URL}/qr-check?id=${qrId}`, {
            credentials: 'include'
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showQRResult({
                qrId,
                ...result,
                needsWalletVerification: true
            });
        } else {
            showQRError(result.message || 'Failed to verify QR code');
        }
        
    } catch (error) {
        showQRError(error.message || 'Failed to verify QR code');
    }
}

/**
 * Show QR error
 * @param {string} message - Error message
 */
function showQRError(message) {
    const errorDiv = document.getElementById('qr-error');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

/**
 * Show QR result
 * @param {Object} result - QR result data
 */
function showQRResult(result) {
    const resultDiv = document.getElementById('qr-result');
    
    resultDiv.innerHTML = `
        <p class="font-medium text-lg mb-4 text-center">QR Code Verification Result</p>
        
        <div class="bg-white p-4 rounded-lg border border-slate-100 text-sm space-y-3">
            <div class="flex justify-between">
                <span class="text-slate-500">Document Type:</span>
                <span class="font-semibold">${result.docType}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-slate-500">Status:</span>
                <span class="font-bold ${result.verificationStatus === 'Verified' ? 'text-emerald-600' : 'text-orange-600'}">
                    ${result.verificationStatus}
                </span>
            </div>
            <div class="flex justify-between">
                <span class="text-slate-500">Submitted:</span>
                <span class="font-medium">
                    ${new Date(result.submittedAt).toLocaleDateString()}
                </span>
            </div>

            ${result.needsWalletVerification ? `
                <div class="mt-4 pt-4 border-t border-slate-200">
                    <p class="text-sm text-slate-600 mb-3">
                        🔐 Wallet verification required to view full document details
                    </p>
                    <div class="space-y-2">
                        <button
                            onclick="verifyQRWallet('${result.qrId}')"
                            id="verify-wallet-button"
                            class="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                        >
                            Verify with MetaMask
                        </button>
                        <p class="text-xs text-slate-500 text-center">
                            Note: You need to use the wallet that was linked to this document's owner account.
                        </p>
                    </div>
                </div>
            ` : ''}
        </div>
    `;
    
    resultDiv.classList.remove('hidden');
}

/**
 * Verify QR with wallet
 * @param {string} qrId - QR ID
 */
async function verifyQRWallet(qrId) {
    try {
        if (typeof window.ethereum === 'undefined') {
            showQRError('MetaMask is required for wallet verification. Please install MetaMask extension.');
            return;
        }
        
        toggleLoading(true);
        
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const walletAddress = accounts[0];
        
        const message = `Verify document access for QR ID: ${qrId}`;
        const signature = await window.ethereum.request({
            method: 'personal_sign',
            params: [message, walletAddress],
        });
        
        const response = await fetch(`${API_BASE_URL}/qr-verify-signature`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                qrId,
                walletAddress,
                signature,
                message
            }),
            credentials: 'include'
        });
        
        const result = await response.json();
        
        if (response.ok) {
            // Update result with full details
            const resultDiv = document.getElementById('qr-result');
            const currentContent = resultDiv.innerHTML;
            
            let statusMessage = '✅ Wallet Verified - Full Details:';
            let statusClass = 'text-emerald-600';
            
            // Handle warning for documents without linked wallets
            if (result.warning) {
                statusMessage = '⚠️ Wallet Verified (No Owner Wallet Linked) - Full Details:';
                statusClass = 'text-orange-600';
            }
            
            const walletSection = `
                <div class="mt-4 pt-4 border-t border-slate-200 space-y-2">
                    <p class="text-sm font-semibold ${statusClass} mb-2">
                        ${statusMessage}
                    </p>
                    ${result.warning ? `
                        <div class="mb-3 p-2 bg-orange-50 border border-orange-200 rounded text-xs text-orange-700">
                            ${result.warning}
                        </div>
                    ` : ''}
                    <div class="flex justify-between">
                        <span class="text-slate-500">Document Number:</span>
                        <span class="font-medium">${result.docNumber}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-500">File Hash:</span>
                        <span class="font-mono text-xs">${result.fileHash?.substring(0, 20)}...</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-500">Blockchain TX:</span>
                        <span class="font-mono text-xs">${result.transactionHash?.substring(0, 20)}...</span>
                    </div>
                    ${result.documentCID ? `
                        <div class="flex justify-between">
                            <span class="text-slate-500">IPFS CID:</span>
                            <span class="font-mono text-xs">${result.documentCID.substring(0, 20)}...</span>
                        </div>
                    ` : ''}
                </div>
            `;
            
            resultDiv.innerHTML = currentContent.replace(/needsWalletVerification.*?<\/div>\s*<\/div>/s, '') + walletSection;
            
            if (result.warning) {
                showToast('Wallet verified with warning - check details', 'info');
            } else {
                showToast('Wallet verified successfully!', 'success');
            }
        } else {
            // Enhanced error handling
            let errorMessage = result.message || 'Wallet verification failed';
            
            if (result.details) {
                errorMessage += `\n\nYour wallet: ${result.details.yourWallet}\nRequired wallet: ${result.details.requiredWallet}`;
                
                if (result.details.suggestion) {
                    errorMessage += `\n\nSuggestion: ${result.details.suggestion}`;
                }
            }
            
            showQRError(errorMessage);
        }
        
    } catch (error) {
        console.error('Wallet verification error:', error);
        if (error.message.includes('User rejected')) {
            showQRError('MetaMask signature was cancelled. Please try again.');
        } else {
            showQRError(`Wallet verification failed: ${error.message}`);
        }
    } finally {
        toggleLoading(false);
    }
}

/**
 * Toggle QR camera
 */
function toggleQRCamera() {
    const cameraView = document.getElementById('qr-camera-view');
    const toggleButton = document.getElementById('camera-toggle');
    
    if (toggleButton.textContent === 'Start Camera') {
        cameraView.innerHTML = `
            <div class="text-white text-center">
                <div class="animate-pulse text-4xl mb-4">📷</div>
                <p>Camera is active - point at QR code</p>
                <p class="text-sm text-white/70 mt-2">
                    (Camera scanning not implemented - use Upload Image instead)
                </p>
            </div>
        `;
        toggleButton.textContent = 'Stop Camera';
        toggleButton.className = 'bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors';
    } else {
        cameraView.innerHTML = `
            <div class="text-white/50 text-center">
                <div class="text-4xl mb-4">📱</div>
                <p>Camera is off</p>
            </div>
        `;
        toggleButton.textContent = 'Start Camera';
        toggleButton.className = 'bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-xl transition-colors';
    }
}

/**
 * Setup user profile functionality
 */
function setupUserProfile() {
    const form = document.getElementById('profile-form');
    const messageDiv = document.getElementById('profile-message');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const profileData = {
                fullName: formData.get('fullName'),
                email: formData.get('email'),
                phone: formData.get('phone')
            };
            
            toggleLoading(true);
            messageDiv.classList.add('hidden');
            
            try {
                const response = await fetch(`${API_BASE_URL}/profile`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(profileData),
                    credentials: 'include'
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    currentUser = { ...currentUser, ...profileData };
                    updateUserInterface();
                    
                    messageDiv.className = 'p-3 rounded-lg text-sm bg-green-50 text-green-700 border border-green-200';
                    messageDiv.textContent = 'Profile updated successfully!';
                    messageDiv.classList.remove('hidden');
                    
                    showToast('Profile updated successfully!', 'success');
                } else {
                    messageDiv.className = 'p-3 rounded-lg text-sm bg-red-50 text-red-700 border border-red-200';
                    messageDiv.textContent = result.message || 'Failed to update profile';
                    messageDiv.classList.remove('hidden');
                    
                    showToast('Failed to update profile', 'error');
                }
                
            } catch (error) {
                console.error('Profile update error:', error);
                messageDiv.className = 'p-3 rounded-lg text-sm bg-red-50 text-red-700 border border-red-200';
                messageDiv.textContent = 'Connection error. Please try again.';
                messageDiv.classList.remove('hidden');
                
                showToast('Connection error', 'error');
            } finally {
                toggleLoading(false);
            }
        });
    }
}

/**
 * Link wallet functionality
 */
async function linkWallet() {
    try {
        if (typeof window.ethereum === 'undefined') {
            showToast('MetaMask is required. Please install MetaMask extension.', 'error');
            return;
        }
        
        toggleLoading(true);
        
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const walletAddress = accounts[0];
        
        const response = await fetch(`${API_BASE_URL}/profile/link-wallet`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ walletAddress }),
            credentials: 'include'
        });
        
        const result = await response.json();
        
        if (response.ok) {
            currentUser.walletAddress = walletAddress;
            updateUserInterface();
            showDashboardSection('profile'); // Refresh profile page
            showToast('Wallet linked successfully!', 'success');
        } else {
            showToast(result.message || 'Failed to link wallet', 'error');
        }
        
    } catch (error) {
        console.error('Wallet linking error:', error);
        if (error.message.includes('User rejected')) {
            showToast('MetaMask connection was cancelled.', 'error');
        } else {
            showToast('Failed to link wallet', 'error');
        }
    } finally {
        toggleLoading(false);
    }
}

/**
 * Load analytics charts
 */
function loadAnalyticsCharts() {
    // Load Chart.js if not already loaded
    if (typeof Chart === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = () => createCharts();
        document.head.appendChild(script);
    } else {
        createCharts();
    }
}

/**
 * Create analytics charts
 */
function createCharts() {
    const docs = userDocuments || [];
    
    // Status Distribution Chart
    const statusCtx = document.getElementById('status-chart');
    if (statusCtx) {
        const statusCounts = {
            verified: docs.filter(doc => doc.status === 'Verified').length,
            rejected: docs.filter(doc => doc.status === 'Rejected').length,
            pending: docs.filter(doc => doc.status === 'Pending').length
        };
        
        new Chart(statusCtx, {
            type: 'doughnut',
            data: {
                labels: ['Verified', 'Rejected', 'Pending'],
                datasets: [{
                    data: [statusCounts.verified, statusCounts.rejected, statusCounts.pending],
                    backgroundColor: ['#10b981', '#ef4444', '#f59e0b'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Document Types Chart
    const typesCtx = document.getElementById('types-chart');
    if (typesCtx) {
        const typeCounts = {};
        docs.forEach(doc => {
            const type = doc.docType || 'Unknown';
            typeCounts[type] = (typeCounts[type] || 0) + 1;
        });
        
        new Chart(typesCtx, {
            type: 'bar',
            data: {
                labels: Object.keys(typeCounts),
                datasets: [{
                    label: 'Documents',
                    data: Object.values(typeCounts),
                    backgroundColor: '#3b82f6',
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }
}

/**
 * View document with MetaMask verification
 * @param {string} docId - Document ID
 */
async function viewDocument(docId) {
    console.log('viewDocument called with docId:', docId);
    
    const doc = userDocuments.find(d => d.id === docId);
    if (!doc) {
        console.error('Document not found:', docId);
        showToast('Document not found', 'error');
        return;
    }

    if (doc.status === 'Rejected') {
        showToast('This document has been rejected and cannot be viewed', 'error');
        return;
    }
    
    console.log('Found document:', doc);
    
    try {
        // Check if MetaMask is available
        if (!window.ethereum) {
            showToast('MetaMask is required to view documents', 'error');
            return;
        }
        
        toggleLoading(true);
        
        // Request MetaMask connection
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const walletAddress = accounts[0];
        
        if (!walletAddress) {
            showToast('Please connect your MetaMask wallet', 'error');
            toggleLoading(false);
            return;
        }
        
        console.log('MetaMask connected:', walletAddress);
        
        // Create signature for document access
        const message = `Access document: ${docId}`;
        const signature = await window.ethereum.request({
            method: 'personal_sign',
            params: [message, walletAddress]
        });
        
        console.log('Signature created:', signature);
        
        // Request document from backend with MetaMask verification
        const response = await fetch(`${API_BASE_URL}/documents/${docId}/view`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                walletAddress: walletAddress,
                signature: signature
            })
        });
        
        const result = await response.json();
        console.log('Backend response:', result);
        
        if (!response.ok) {
            throw new Error(result.message || 'Failed to access document');
        }
        
        if (result.success) {
            // Show document viewer modal
            console.log('Showing document viewer...');
            showDocumentViewer(result.document, result.content, result.downloadUrl);
            showToast('Document accessed successfully', 'success');
        } else {
            throw new Error('Failed to retrieve document');
        }
        
    } catch (error) {
        console.error('Document view error:', error);
        if (error.message.includes('User rejected')) {
            showToast('MetaMask signature was cancelled', 'error');
        } else {
            showToast(error.message || 'Failed to access document', 'error');
        }
    } finally {
        toggleLoading(false);
    }
}

/**
 * Show document viewer modal
 * @param {Object} document - Document metadata
 * @param {string} content - Base64 encoded document content
 * @param {string} downloadUrl - IPFS download URL
 */
function showDocumentViewer(doc, content, downloadUrl) {
    console.log('showDocumentViewer called with:', doc, downloadUrl);
    
    // Remove any existing modal first
    // Note: 'document' here now correctly refers to the global document object
    const existingModal = document.getElementById('document-viewer-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal element
    const modal = document.createElement('div');
    modal.id = 'document-viewer-modal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden';
    
    // Set modal content HTML
    modalContent.innerHTML = `
        <div class="flex items-center justify-between p-6 border-b border-slate-200">
            <div>
                <h3 class="text-xl font-bold text-slate-900">${doc.name || 'Document'}</h3>
                <p class="text-sm text-slate-600 mt-1">
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                        ${doc.verificationStatus || 'Verified'}
                    </span>
                    Uploaded: ${doc.submittedAt ? new Date(doc.submittedAt).toLocaleDateString() : 'N/A'}
                </p>
            </div>
            <button onclick="closeDocumentViewer()" class="text-slate-400 hover:text-slate-600 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
        
        <div class="p-6 border-b border-slate-200 bg-slate-50">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                    <span class="font-medium text-slate-700">Document Type:</span>
                    <p class="text-slate-900">${doc.docType || 'N/A'}</p>
                </div>
                <div>
                    <span class="font-medium text-slate-700">Document Number:</span>
                    <p class="text-slate-900">${doc.docNumber || 'N/A'}</p>
                </div>
                <div>
                    <span class="font-medium text-slate-700">File Size:</span>
                    <p class="text-slate-900">${doc.size ? formatFileSize(doc.size) : 'N/A'}</p>
                </div>
            </div>
            
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                    <span class="font-medium text-slate-700">IPFS Hash:</span>
                    <p class="text-slate-900 font-mono text-xs break-all">${doc.ipfsHash || 'N/A'}</p>
                </div>
                <div>
                    <span class="font-medium text-slate-700">Blockchain Tx:</span>
                    <p class="text-slate-900 font-mono text-xs break-all">${doc.transactionHash || 'N/A'}</p>
                </div>
            </div>
        </div>
        
        <div class="p-6 max-h-96 overflow-y-auto">
            <div class="text-center">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                </div>
                <h4 class="text-lg font-semibold text-slate-900 mb-2">Document Ready for Download</h4>
                <p class="text-slate-600 mb-6">This document has been verified and is stored securely on IPFS blockchain storage.</p>
                
                <div class="flex flex-col sm:flex-row gap-3 justify-center">
                    <button 
                        onclick="downloadDocument('${downloadUrl}', '${doc.name || 'document'}')"
                        class="btn-primary inline-flex items-center px-6 py-3 text-white font-medium rounded-lg transition-colors"
                    >
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Download Document
                    </button>
                    
                    <button 
                        onclick="openInNewTab('${downloadUrl}')"
                        class="inline-flex items-center px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors"
                    >
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                        Open in New Tab
                    </button>
                </div>
            </div>
        </div>
        
        <div class="flex items-center justify-between p-6 border-t border-slate-200 bg-slate-50">
            <div class="text-sm text-slate-600">
                <span class="inline-flex items-center">
                    <svg class="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Verified & Secured by Blockchain
                </span>
            </div>
            <button 
                onclick="closeDocumentViewer()" 
                class="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium transition-colors"
            >
                Close
            </button>
        </div>
    `;
    
    // Append content to modal
    modal.appendChild(modalContent);
    
    // Append modal to body
    document.body.appendChild(modal);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    console.log('Modal created and added to DOM');
}

/**
 * Close document viewer modal
 */
function closeDocumentViewer() {
    const modal = document.getElementById('document-viewer-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

/**
 * Download document from IPFS
 * @param {string} downloadUrl - IPFS URL
 * @param {string} filename - Document filename
 */
async function downloadDocument(downloadUrl, filename) {
    try {
        console.log('Downloading document:', downloadUrl, filename);
        showToast('Starting download...', 'info');
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename || 'document';
        link.target = '_blank';
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showToast('Download started successfully', 'success');
    } catch (error) {
        console.error('Download error:', error);
        showToast('Failed to download document', 'error');
    }
}

/**
 * Open document in new tab
 * @param {string} url - IPFS URL
 */
function openInNewTab(url) {
    try {
        console.log('Opening in new tab:', url);
        window.open(url, '_blank');
        showToast('Document opened in new tab', 'success');
    } catch (error) {
        console.error('Open in new tab error:', error);
        showToast('Failed to open document', 'error');
    }
}

/**
 * Format file size in human readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
function formatFileSize(bytes) {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Toggle auto refresh
 */
function toggleAutoRefresh() {
    // Implementation for auto-refresh toggle
    const toggle = document.getElementById('auto-refresh-toggle');
    if (toggle) {
        const isActive = toggle.classList.contains('bg-brand-600');
        if (isActive) {
            toggle.classList.remove('bg-brand-600');
            toggle.classList.add('bg-slate-300');
            toggle.querySelector('span').classList.remove('translate-x-6');
            toggle.querySelector('span').classList.add('translate-x-1');
        } else {
            toggle.classList.add('bg-brand-600');
            toggle.classList.remove('bg-slate-300');
            toggle.querySelector('span').classList.add('translate-x-6');
            toggle.querySelector('span').classList.remove('translate-x-1');
        }
    }
}

// --- EVENT LISTENERS ---

// Test function availability
console.log('Functions available:', {
    viewDocument: typeof viewDocument,
    showDocumentViewer: typeof showDocumentViewer,
    closeDocumentViewer: typeof closeDocumentViewer,
    downloadDocument: typeof downloadDocument,
    openInNewTab: typeof openInNewTab
});

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Populate country codes
    populateCountryCodes();

    // Check authentication status
    checkAuthStatus();
    
    // Setup form event listeners
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');
    
    if (signinForm) {
        signinForm.addEventListener('submit', handleSignin);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
        // Add password strength listener
        const passwordInput = document.getElementById('signup-password');
        if (passwordInput) {
            passwordInput.addEventListener('input', (e) => checkPasswordStrength(e.target.value));
        }
    }
    
    // Setup responsive sidebar
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebar-overlay');
            sidebar.classList.remove('open');
            overlay.classList.add('hidden');
        }
    });
});

// Export functions for global access
window.showPage = showPage;
window.showAuth = showAuth;
window.switchAuthTab = switchAuthTab;
window.toggleSidebar = toggleSidebar;
window.showDashboardSection = showDashboardSection;
window.handleLogout = handleLogout;

// ==========================================
// SHARE DOCUMENT FEATURE
// ==========================================

const IITS = [
    'IIT Kharagpur', 'IIT Bombay', 'IIT Madras', 'IIT Kanpur', 'IIT Delhi', 
    'IIT Guwahati', 'IIT Roorkee', 'IIT Ropar', 'IIT Bhubaneswar', 'IIT Gandhinagar', 
    'IIT Hyderabad', 'IIT Jodhpur', 'IIT Patna', 'IIT Indore', 'IIT Mandi', 
    'IIT (BHU) Varanasi', 'IIT (ISM) Dhanbad', 'IIT Palakkad', 'IIT Tirupati', 
    'IIT Jammu', 'IIT Bhilai', 'IIT Goa', 'IIT Dharwad'
];

const NITS = [
    'NIT Tiruchirappalli (Trichy)', 'NIT Karnataka (Surathkal)', 'NIT Rourkela', 'NIT Warangal', 
    'NIT Calicut', 'NIT Nagpur (VNIT)', 'NIT Silchar', 'NIT Jaipur (MNIT)', 'NIT Durgapur', 
    'NIT Delhi', 'NIT Jamshedpur', 'NIT Kurukshetra', 'NIT Allahabad (MNNIT)', 'NIT Agartala', 
    'NIT Raipur', 'NIT Bhopal (MANIT)', 'NIT Srinagar', 'NIT Jalandhar (Dr. B.R. Ambedkar)', 
    'NIT Patna', 'NIT Goa', 'NIT Puducherry', 'NIT Uttarakhand', 'NIT Mizoram', 'NIT Meghalaya', 
    'NIT Manipur', 'NIT Nagaland', 'NIT Arunachal Pradesh', 'NIT Sikkim', 'NIT Andhra Pradesh', 
    'NIT Hamirpur', 'IIEST Shibpur'
];

const IIITS = [
    'IIIT Allahabad', 'IIIT Gwalior (ABV-IIITM)', 'IIIT Jabalpur (IIITDM)', 'IIIT Kancheepuram (IIITDM)', 
    'IIIT Hyderabad', 'IIIT Bangalore', 'IIIT Guwahati', 'IIIT Vadodara', 'IIIT Kota', 
    'IIIT Tiruchirappalli', 'IIIT Una', 'IIIT Sonepat', 'IIIT Kalyani', 'IIIT Lucknow', 
    'IIIT Dharwad', 'IIIT Kurnool (IIITDM)', 'IIIT Kottayam', 'IIIT Manipur', 'IIIT Nagpur', 
    'IIIT Pune', 'IIIT Ranchi', 'IIIT Surat', 'IIIT Bhopal', 'IIIT Bhagalpur', 'IIIT Agartala', 
    'IIIT Raichur'
];

function getShareDocumentHTML() {
    return `
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold text-slate-800 flex items-center gap-3">
                        📤 Share Document
                    </h1>
                    <p class="text-slate-600 mt-1">
                        Temporarily share your verified documents with institutes (48-hour access)
                    </p>
                </div>
            </div>

            <!-- Active Shares Section -->
            <div id="active-shares-container" class="space-y-4 hidden">
                <h3 class="text-lg font-semibold text-slate-800">Active Shares</h3>
                <div id="active-shares-list" class="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
            </div>

            <!-- Categories Tabs -->
            <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div class="flex border-b border-slate-100">
                    <button onclick="switchShareTab('iits')" id="tab-iits" class="flex-1 px-6 py-4 text-sm font-medium text-brand-600 border-b-2 border-brand-600 bg-brand-50 transition-colors">
                        IITs
                    </button>
                    <button onclick="switchShareTab('nits')" id="tab-nits" class="flex-1 px-6 py-4 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
                        NITs
                    </button>
                    <button onclick="switchShareTab('iiits')" id="tab-iiits" class="flex-1 px-6 py-4 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
                        IIITs
                    </button>
                </div>
                
                <div class="p-6">
                    <div id="list-iits" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
                    <div id="list-nits" class="hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
                    <div id="list-iiits" class="hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
                </div>
            </div>
        </div>

        <!-- Share Modal -->
        <div id="share-modal" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
            <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-scale-in">
                <h3 class="text-xl font-bold text-slate-800 mb-4">Grant Access</h3>
                <p class="text-slate-600 mb-6">Select a document to share with <span id="modal-institute-name" class="font-semibold text-brand-600"></span>.</p>
                
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">Select Document</label>
                        <select id="share-doc-select" class="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none">
                            <option value="">-- Choose a document --</option>
                        </select>
                    </div>

                    <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
                        <div class="text-amber-500">⚠️</div>
                        <p class="text-xs text-amber-700">
                            Access will be valid for <strong>48 hours</strong> only. You will need to sign a transaction to confirm.
                        </p>
                    </div>

                    <div class="flex gap-3 pt-2">
                        <button onclick="closeShareModal()" class="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium transition-colors">
                            Cancel
                        </button>
                        <button onclick="confirmShare()" class="flex-1 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium shadow-lg shadow-brand-500/20 transition-all transform hover:-translate-y-0.5">
                            Give Access
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function setupShareDocument() {
    renderShareSections();
    updateTimers();
    setInterval(updateTimers, 1000);
    
    // Switch to first tab by default
    switchShareTab('iits'); 
}

function renderShareSections() {
    const createCard = (name) => `
        <div class="p-4 rounded-xl border border-slate-200 hover:border-brand-200 hover:shadow-md transition-all bg-white group">
            <div class="flex items-start justify-between mb-3">
                <div class="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center text-xl group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                    🏛️
                </div>
                <button onclick="handleGiveAccess('${name}')" class="text-xs font-medium text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-full transition-colors">
                    Give Access
                </button>
            </div>
            <h4 class="font-medium text-slate-800 text-sm">${name}</h4>
        </div>
    `;

    document.getElementById('list-iits').innerHTML = IITS.map(createCard).join('');
    document.getElementById('list-nits').innerHTML = NITS.map(createCard).join('');
    document.getElementById('list-iiits').innerHTML = IIITS.map(createCard).join('');
}

function switchShareTab(tabId) {
    // Buttons
    ['iits', 'nits', 'iiits'].forEach(id => {
        const btn = document.getElementById(`tab-${id}`);
        const list = document.getElementById(`list-${id}`);
        
        if (id === tabId) {
            btn.classList.add('text-brand-600', 'border-b-2', 'border-brand-600', 'bg-brand-50');
            btn.classList.remove('text-slate-500');
            list.classList.remove('hidden');
        } else {
            btn.classList.remove('text-brand-600', 'border-b-2', 'border-brand-600', 'bg-brand-50');
            btn.classList.add('text-slate-500');
            list.classList.add('hidden');
        }
    });
}

function handleGiveAccess(instituteName) {
    const modal = document.getElementById('share-modal');
    const nameSpan = document.getElementById('modal-institute-name');
    const select = document.getElementById('share-doc-select');

    nameSpan.textContent = instituteName;
    modal.dataset.institute = instituteName; // Store for confirm
    
    // Populate docs
    select.innerHTML = '<option value="">-- Choose a document --</option>';
    userDocuments.forEach(doc => {
        if (doc.status === 'Verified') {
            const opt = document.createElement('option');
            opt.value = doc.id;
            opt.textContent = doc.name;
            select.appendChild(opt);
        }
    });

    modal.classList.remove('hidden');
}

function closeShareModal() {
    document.getElementById('share-modal').classList.add('hidden');
}

async function confirmShare() {
    const modal = document.getElementById('share-modal');
    const instituteName = modal.dataset.institute;
    const docId = document.getElementById('share-doc-select').value;
    
    if (!docId) {
        showToast('Please select a document', 'error');
        return;
    }

    if (!window.ethereum) {
        showToast('MetaMask is required', 'error');
        return;
    }

    closeShareModal();
    toggleLoading(true);

    try {
        // Simulate Transaction
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const from = accounts[0];
        
        // Mock sign just for effect (or use personal_sign)
        // We'll just assume success if we got accounts for this demo to be faster
        // Or we can do a dummy signature to look real
        
        // Creating a dummy transaction hash
        const mockTxHash = '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        
        // Save to local storage
        const shares = JSON.parse(localStorage.getItem('share_active_shares') || '[]');
        const doc = userDocuments.find(d => d.id === docId);
        
        shares.push({
            institute: instituteName,
            docName: doc.name,
            docHash: doc.documentCID,
            expiry: Date.now() + (48 * 60 * 60 * 1000), // 48 hours
            txHash: mockTxHash
        });
        
        localStorage.setItem('share_active_shares', JSON.stringify(shares));
        
        // Show success screen (Overlay)
        showAccessGranted(instituteName, doc.name, mockTxHash);
        
        // Update UI
        updateTimers();
        
    } catch (error) {
        console.error(error);
        showToast('Transaction rejected', 'error');
    } finally {
        toggleLoading(false);
    }
}

function showAccessGranted(institute, docName, txHash) {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-slate-900/90 z-[60] flex items-center justify-center p-4 animate-fade-in';
    overlay.innerHTML = `
        <div class="bg-white rounded-3xl p-8 max-w-lg w-full text-center relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
            
            <div class="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 animate-bounce-soft">
                ✅
            </div>
            
            <h2 class="text-2xl font-bold text-slate-800 mb-2">Access Granted!</h2>
            <p class="text-slate-600 mb-8">
                You have successfully shared <strong>${docName}</strong> with <strong>${institute}</strong>.
            </p>
            
            <div class="bg-slate-50 rounded-xl p-4 text-left space-y-3 mb-8 border border-slate-100">
                <div class="flex justify-between">
                    <span class="text-xs text-slate-500 uppercase tracking-wider">Validity</span>
                    <span class="text-sm font-semibold text-brand-600">48 Hours</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-xs text-slate-500 uppercase tracking-wider">Transaction ID</span>
                    <span class="text-xs font-mono text-slate-700" title="${txHash}">${txHash.substring(0, 10)}...${txHash.substring(txHash.length - 8)}</span>
                </div>
            </div>

            <button onclick="this.parentElement.parentElement.remove()" class="w-full bg-slate-900 text-white rounded-xl py-4 font-semibold hover:bg-slate-800 transition-all">
                Close
            </button>
        </div>
    `;
    document.body.appendChild(overlay);
}

function updateTimers() {
    const list = document.getElementById('active-shares-list');
    const container = document.getElementById('active-shares-container');
    if (!list) return;

    let shares = JSON.parse(localStorage.getItem('share_active_shares') || '[]');
    const now = Date.now();
    
    // Filter expired
    const validShares = shares.filter(s => s.expiry > now);
    
    if (validShares.length !== shares.length) {
        localStorage.setItem('share_active_shares', JSON.stringify(validShares));
        shares = validShares; // Update ref
    }
    
    if (shares.length === 0) {
        container.classList.add('hidden');
        return;
    }
    
    container.classList.remove('hidden');
    list.innerHTML = shares.map(share => {
        const diff = share.expiry - now;
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        return `
            <div class="bg-brand-900 text-white p-4 rounded-xl flex items-center justify-between shadow-lg shadow-brand-900/20">
                <div>
                    <div class="text-xs text-brand-300 mb-1">Shared with</div>
                    <div class="font-semibold">${share.institute}</div>
                    <div class="text-xs text-brand-200 mt-1">${share.docName}</div>
                </div>
                <div class="text-right">
                    <div class="text-xs text-brand-300 mb-1">Expires in</div>
                    <div class="text-xl font-mono font-bold tracking-widest text-emerald-400">
                        ${timeString}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}
window.handleGiveAccess = handleGiveAccess;
window.closeShareModal = closeShareModal;
window.confirmShare = confirmShare;
window.switchShareTab = switchShareTab;