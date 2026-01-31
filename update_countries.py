
import re
import os

# Map of Country Code to Name
COUNTRY_NAMES = {
    "AF": "Afghanistan", "AL": "Albania", "DZ": "Algeria", "AS": "American Samoa", "AD": "Andorra",
    "AO": "Angola", "AI": "Anguilla", "AQ": "Antarctica", "AG": "Antigua & Barbuda", "AR": "Argentina",
    "AM": "Armenia", "AW": "Aruba", "AU": "Australia", "AT": "Austria", "AZ": "Azerbaijan",
    "BS": "Bahamas", "BH": "Bahrain", "BD": "Bangladesh", "BB": "Barbados", "BY": "Belarus",
    "BE": "Belgium", "BZ": "Belize", "BJ": "Benin", "BM": "Bermuda", "BT": "Bhutan",
    "BO": "Bolivia", "BA": "Bosnia & Herzegovina", "BW": "Botswana", "BR": "Brazil", "IO": "British Indian Ocean Territory",
    "VG": "British Virgin Islands", "BN": "Brunei", "BG": "Bulgaria", "BF": "Burkina Faso", "BI": "Burundi",
    "KH": "Cambodia", "CM": "Cameroon", "CA": "Canada", "CV": "Cape Verde", "KY": "Cayman Islands",
    "CF": "Central African Republic", "TD": "Chad", "CL": "Chile", "CN": "China", "CX": "Christmas Island",
    "CC": "Cocos Islands", "CO": "Colombia", "KM": "Comoros", "CK": "Cook Islands", "CR": "Costa Rica",
    "HR": "Croatia", "CU": "Cuba", "CW": "Curacao", "CY": "Cyprus", "CZ": "Czech Republic",
    "CD": "DR Congo", "DK": "Denmark", "DJ": "Djibouti", "DM": "Dominica", "DO": "Dominican Republic",
    "TL": "East Timor", "EC": "Ecuador", "EG": "Egypt", "SV": "El Salvador", "GQ": "Equatorial Guinea",
    "ER": "Eritrea", "EE": "Estonia", "ET": "Ethiopia", "FK": "Falkland Islands", "FO": "Faroe Islands",
    "FJ": "Fiji", "FI": "Finland", "FR": "France", "PF": "French Polynesia", "GA": "Gabon",
    "GM": "Gambia", "GE": "Georgia", "DE": "Germany", "GH": "Ghana", "GI": "Gibraltar",
    "GR": "Greece", "GL": "Greenland", "GD": "Grenada", "GU": "Guam", "GT": "Guatemala",
    "GG": "Guernsey", "GN": "Guinea", "GW": "Guinea-Bissau", "GY": "Guyana", "HT": "Haiti",
    "HN": "Honduras", "HK": "Hong Kong", "HU": "Hungary", "IS": "Iceland", "IN": "India",
    "ID": "Indonesia", "IR": "Iran", "IQ": "Iraq", "IE": "Ireland", "IM": "Isle of Man",
    "IL": "Israel", "IT": "Italy", "CI": "Ivory Coast", "JM": "Jamaica", "JP": "Japan",
    "JE": "Jersey", "JO": "Jordan", "KZ": "Kazakhstan", "KE": "Kenya", "KI": "Kiribati",
    "XK": "Kosovo", "KW": "Kuwait", "KG": "Kyrgyzstan", "LA": "Laos", "LV": "Latvia",
    "LB": "Lebanon", "LS": "Lesotho", "LR": "Liberia", "LY": "Libya", "LI": "Liechtenstein",
    "LT": "Lithuania", "LU": "Luxembourg", "MO": "Macau", "MK": "North Macedonia", "MG": "Madagascar",
    "MW": "Malawi", "MY": "Malaysia", "MV": "Maldives", "ML": "Mali", "MT": "Malta",
    "MH": "Marshall Islands", "MR": "Mauritania", "MU": "Mauritius", "YT": "Mayotte", "MX": "Mexico",
    "FM": "Micronesia", "MD": "Moldova", "MC": "Monaco", "MN": "Mongolia", "ME": "Montenegro",
    "MS": "Montserrat", "MA": "Morocco", "MZ": "Mozambique", "MM": "Myanmar", "NA": "Namibia",
    "NR": "Nauru", "NP": "Nepal", "NL": "Netherlands", "AN": "Netherlands Antilles", "NC": "New Caledonia",
    "NZ": "New Zealand", "NI": "Nicaragua", "NE": "Niger", "NG": "Nigeria", "NU": "Niue",
    "NF": "Norfolk Island", "KP": "North Korea", "MP": "Northern Mariana Islands", "NO": "Norway",
    "OM": "Oman", "PK": "Pakistan", "PW": "Palau", "PS": "Palestine", "PA": "Panama",
    "PG": "Papua New Guinea", "PY": "Paraguay", "PE": "Peru", "PH": "Philippines", "PN": "Pitcairn",
    "PL": "Poland", "PT": "Portugal", "PR": "Puerto Rico", "QA": "Qatar", "CG": "Congo",
    "RE": "Reunion", "RO": "Romania", "RU": "dRussia", "RW": "Rwanda", "BL": "St Barthelemy",
    "SH": "St Helena", "KN": "St Kitts & Nevis", "LC": "St Lucia", "MF": "St Martin", "PM": "St Pierre & Miquelon",
    "VC": "St Vincent & Grenadines", "WS": "Samoa", "SM": "San Marino", "ST": "Sao Tome & Principe",
    "SA": "Saudi Arabia", "SN": "Senegal", "RS": "Serbia", "SC": "Seychelles", "SL": "Sierra Leone",
    "SG": "Singapore", "SX": "Sint Maarten", "SK": "Slovakia", "SI": "Slovenia", "SB": "Solomon Islands",
    "SO": "Somalia", "ZA": "South Africa", "KR": "South Korea", "SS": "South Sudan", "ES": "Spain",
    "LK": "Sri Lanka", "SD": "Sudan", "SR": "Suriname", "SJ": "Svalbard", "SZ": "Eswatini",
    "SE": "Sweden", "CH": "Switzerland", "SY": "Syria", "TW": "Taiwan", "TJ": "Tajikistan",
    "TZ": "Tanzania", "TH": "Thailand", "TG": "Togo", "TK": "Tokelau", "TO": "Tonga",
    "TT": "Trinidad & Tobago", "TN": "Tunisia", "TR": "Turkey", "TM": "Turkmenistan",
    "TC": "Turks & Caicos", "TV": "Tuvalu", "UG": "Uganda", "UA": "Ukraine", "AE": "UAE",
    "GB": "United Kingdom", "US": "United States", "UY": "Uruguay", "UZ": "Uzbekistan", "VU": "Vanuatu",
    "VA": "Vatican City", "VE": "Venezuela", "VN": "Vietnam", "WF": "Wallis & Futuna", "YE": "Yemen",
    "ZM": "Zambia", "ZW": "Zimbabwe", "RU": "Russia"
}

# The user code might have lowercase keys like 'Vg' or 'Pg'. We'll handle case-insensitivity.
# Normalizing dictionary keys to uppercase just in case.
COUNTRY_NAMES_UPPER = {k.upper(): v for k, v in COUNTRY_NAMES.items()}

file_path = 'docV/frontend/script.js'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
in_country_codes = False

for line in lines:
    # Check if we are inside the COUNTRY_CODES block
    if 'const COUNTRY_CODES = [' in line:
        in_country_codes = True
        new_lines.append(line)
        continue
    
    if in_country_codes:
        if '];' in line and line.strip() == '];':
            in_country_codes = False
            new_lines.append(line)
            continue
        
        # Process the line
        # Expected format: { code: "AF", dial_code: "+93", flag: "🇦🇫" },
        match = re.search(r'code:\s*"(\w+)"', line)
        if match:
            code = match.group(1)
            name = COUNTRY_NAMES_UPPER.get(code.upper(), code) # Fallback to code if name not found
            
            # Construct new line with name property inserted at the beginning
            # We want: { name: "Afghanistan", code: "AF", ...
            # We can just replace '{ code:' with '{ name: "Name", code:'
            new_line = line.replace('{ code:', f'{{ name: "{name}", code:')
            new_lines.append(new_line)
        else:
            # Maybe comment or empty line inside array
            new_lines.append(line)
    else:
        new_lines.append(line)

# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Updated COUNTRY_CODES with names.")
