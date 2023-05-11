"use strict";
/*

TODO: #2 Dokończyć walidację,
TODO: #4 trzeba będzie wrzucić to na gita,

OPCJONALNE JAKO OSOBNY COMMIT:

TODO: # można by było spróbować może napisać jakieś testy do tego, tak w ramach nauki,
TODO: # można pokminić coś z tym logowaniem i solą i hashem,
TODO: # można pokminić może zapis do pliku albo coś żeby nie trzeba było dymać za każdym razem danych od nowa,
TODO: # można popatrzeć czy jeszcze jakieś funkcjonalność nie warto dodać,

 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var chalk_1 = __importDefault(require("chalk"));
var moment_1 = __importDefault(require("moment"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var workPositions = ["managerLVL1", "managerLVL2", "managerLVL3", "clinicEmployee", "itEmployee", "administrationEmployee", "contractor", "internShip", "admin"];
var roles = ["read-only", "modify", "admin"];
var clinicType = ["Szpital", "Przychodnia", "Klinika"];
var switchUser = false;
var currentUser = null;
var users = [
    {
        id: (0, uuid_1.v4)(),
        name: "admin",
        password: "1",
        passwordHash: "1",
        salt: "1",
        email: "1",
        role: roles[2],
        workPosition: workPositions[8],
        createdAt: "01.01.1001",
    },
    {
        id: "a346a45b-a5ec-4155-9dfc-8d83961575cd",
        createdAt: "04.05.2023",
        name: "Natalia La",
        email: "natalia.la@example.com",
        role: "read-only",
        workPosition: "contractor",
        password: "1",
        passwordHash: "$2a$10$aTkbtcq8clFkcUMbjQ71luP6x.DPJIVjPUFWGbJw98hAsz1yyOeDO",
        salt: "$2a$10$aTkbtcq8clFkcUMbjQ71lu",
    },
    {
        id: "3956b226-11a6-4fc2-8045-21ea411c3f32",
        createdAt: "04.05.2023",
        name: "Lukasz Sza",
        email: "lukasz.sza@example.com",
        role: "modify",
        workPosition: "contractor",
        password: "1",
        passwordHash: "$2a$10$e/wScFc8JueeOkcbNLRGtewlCYedd5uT.8ndWeYTgtFlBGhjReEhy",
        salt: "$2a$10$e/wScFc8JueeOkcbNLRGte",
    },
    {
        id: "3956b226-11a6-4fc2-8045-21ea411c3f32efewfwef",
        createdAt: "01.05.2023",
        name: "Lukasz De",
        email: "lukasz.de@example.com",
        role: "read-only",
        workPosition: "contractor",
        password: "1",
        passwordHash: "$2a$10$e/wScFc8JueeOkcbNLRGtewlCYedd5uT.8ndWeYTgtFlwqdwqdqwdBGhjReEhy",
        salt: "$2a$10$e/wScFcwqdwqdwq8JueeOkcbNLRGte",
    }
];
var patients = [
    {
        id: "ewiunfhf873n87erbnv8er",
        name: "Dennys Jeffrain",
        personalID: "80080080",
        gender: "Mężczyzna",
        address: "ul.Błotna 23/11",
        city: "23-400, Kaczanów",
        phoneNumber: "48 500 512 874",
        email: "w@w.com",
        cardNumber: "E404-12WZ856",
        createdAt: "04.05.2021",
    },
    {
        id: "ewiunfhf873n832849238747erbnv8er",
        name: "Anna Bella",
        personalID: "70070070",
        gender: "Kobieta",
        address: "ul.Twarda 23/11",
        city: "12-100, Chrzanów",
        phoneNumber: "48 798 512 874",
        email: "a@as.com",
        cardNumber: "E500-12WZ100",
        createdAt: "01.01.2017",
    }
];
var clinics = [
    {
        id: "ewoifnweufn928371983712312983fdwejcewnerkuvewfwef",
        name: "Szpital 01",
        address: "ul.Sławna 26",
        city: "02-495 Warszawa",
        type: "Szpital",
        patients: [],
    },
    {
        id: "ewoifnweufn329ru9wevhevweewfwef",
        name: "Przychodnia 01",
        address: "ul.Jasna 26",
        city: "02-222 Radom",
        type: "Przychodnia",
        patients: [],
    },
    {
        id: "ewoifnweufnewfwewoifj98fj34ef",
        name: "Klinika 01",
        address: "ul.Dziwna 26",
        city: "02-615 Lublin",
        type: "Klinika",
        patients: [],
    }
];
var userRequests = [
    {
        id: "weoifrj3498fn983nveer9gerg9ergm",
        name: "lukasz.de@example.com",
        date: "04.05.2023",
        content: "Proszę o zmianę mojej roli z read-only na modify",
        status: "Pending",
    }
];
var mainMenu = [
    "Moje konto",
    "Administrator CRUD",
    "Pacjent CRUD",
    "Przychodnia CRUD",
    "Przeloguj użytkownika",
];
var myAccountMenu = [
    "1.) Wyświetl moje dane",
    "2.) Edytuj moje dane",
    "3.) Poproś o zmianę roli",
    "4.) Wyświetl moje zgłoszenia",
    "5.) Edytuj swoje zgłoszenie",
];
var AdministratorMenu = [
    "1.) Dodaj nowego użytkownika",
    "2.) Usuń użytkownika",
    "3.) Zmodyfikuj dane użytkownika",
    "4.) Wyświetl wszystkich użytkowników",
    "5.) Wyświetl poszczególnego użytkownika",
    "6.) Wyświetl zapytania od użytkowników",
];
var pacjentMenu = [
    "1.) Dodaj nowego pacjenta",
    "2.) Edytuj dane pacjenta",
    "3.) Wyświetl wszystkie przychodnie do których należy pacjent",
    "4.) Wyświetl dane pacjenta",
    "5.) Wyświetl wszystkich pacjentów",
    "6.) Dodaj pacjenta do przychodni",
    "7.) Przenieś pacjenta do innej przychodni",
    "8.) Usuń pacjenta całkowicie z sieci",
];
var przychodniaMenu = [
    "1.) Dodaj nową przychodnie",
    "2.) Edytuj dane przychodni",
    "3.) Wyświetl wszystkie przychodnie",
    "4.) Wyświetl dane przychodni",
    "5.) Wyświetl wszystkich pacjentów z danej przychodni",
    "6.) Usuń przychodnie całkowicie z sieci",
];
var accountMenuPattern = chalk_1.default.bold.blackBright("   ##############################\n") +
    chalk_1.default.bold.blackBright("   ##############################\n") +
    chalk_1.default.bold.blackBright("   ##############################\n") +
    chalk_1.default.bold.blackBright("   ##############################\n") +
    chalk_1.default.bold.blackBright("   ##############################\n") +
    chalk_1.default.bold.blackBright("   ##############################\n") +
    "\n" +
    chalk_1.default.greenBright("   Moje konto menu:\n") +
    "\n" +
    chalk_1.default.bold.yellowBright("   0.) Cofnij do menu g\u0142\u00F3wne\n") +
    chalk_1.default.cyanBright("   ".concat(myAccountMenu[0], ",\n")) +
    chalk_1.default.cyanBright("   ".concat(myAccountMenu[1], ",\n")) +
    chalk_1.default.cyanBright("   ".concat(myAccountMenu[2], ",\n")) +
    chalk_1.default.cyanBright("   ".concat(myAccountMenu[3], ",\n")) +
    chalk_1.default.cyanBright("   ".concat(myAccountMenu[4], ",\n")) +
    "\n" +
    "   Wybrana ".concat(chalk_1.default.underline("cyfra"), ": ");
var adminMenuPattern = chalk_1.default.bold.blackBright("   ##############################\n") +
    chalk_1.default.bold.blackBright("   ##############################\n") +
    chalk_1.default.bold.blackBright("   ##############################\n") +
    chalk_1.default.bold.blackBright("   ##############################\n") +
    chalk_1.default.bold.blackBright("   ##############################\n") +
    chalk_1.default.bold.blackBright("   ##############################\n") +
    "\n" +
    chalk_1.default.greenBright("   Administrator menu:\n") +
    "\n" +
    chalk_1.default.bold.yellowBright("   0.) Cofnij do menu g\u0142\u00F3wne\n") +
    chalk_1.default.cyanBright("   ".concat(AdministratorMenu[0], ",\n")) +
    chalk_1.default.cyanBright("   ".concat(AdministratorMenu[1], ",\n")) +
    chalk_1.default.cyanBright("   ".concat(AdministratorMenu[2], ",\n")) +
    chalk_1.default.cyanBright("   ".concat(AdministratorMenu[3], ",\n")) +
    chalk_1.default.cyanBright("   ".concat(AdministratorMenu[4], ",\n")) +
    chalk_1.default.cyanBright("   ".concat(AdministratorMenu[5], ",\n")) +
    "\n" +
    "   Wybrana ".concat(chalk_1.default.underline("cyfra"), ": ");
var patientMenuPattern = chalk_1.default.bold.blackBright("   ##############################\n") +
    chalk_1.default.bold.blackBright("   ##############################\n") +
    chalk_1.default.bold.blackBright("   ##############################\n") +
    chalk_1.default.bold.blackBright("   ##############################\n") +
    chalk_1.default.bold.blackBright("   ##############################\n") +
    chalk_1.default.bold.blackBright("   ##############################\n") +
    "\n" +
    chalk_1.default.greenBright("   Pacjent menu:\n") +
    "\n" +
    chalk_1.default.bold.yellowBright("   0.) Cofnij do menu g\u0142\u00F3wne\n") +
    chalk_1.default.cyanBright("   ".concat(pacjentMenu[0], ",\n")) +
    chalk_1.default.cyanBright("   ".concat(pacjentMenu[1], ",\n")) +
    chalk_1.default.cyanBright("   ".concat(pacjentMenu[2], ",\n")) +
    chalk_1.default.cyanBright("   ".concat(pacjentMenu[3], ",\n")) +
    chalk_1.default.cyanBright("   ".concat(pacjentMenu[4], ",\n")) +
    chalk_1.default.cyanBright("   ".concat(pacjentMenu[5], ",\n")) +
    chalk_1.default.cyanBright("   ".concat(pacjentMenu[6], ",\n")) +
    chalk_1.default.cyanBright("   ".concat(pacjentMenu[7], ",\n")) +
    "\n" +
    "   Wybrana ".concat(chalk_1.default.underline("cyfra"), ": ");
var clinicMenu = chalk_1.default.bold.blackBright("   ##############################\n") +
    chalk_1.default.bold.blackBright("   ##############################\n") +
    chalk_1.default.bold.blackBright("   ##############################\n") +
    chalk_1.default.bold.blackBright("   ##############################\n") +
    chalk_1.default.bold.blackBright("   ##############################\n") +
    chalk_1.default.bold.blackBright("   ##############################\n") +
    "\n" +
    chalk_1.default.greenBright("   Przychodnia menu:\n") +
    "\n" +
    chalk_1.default.bold.yellowBright("   0.) Cofnij do menu g\u0142\u00F3wne\n") +
    chalk_1.default.cyanBright("   ".concat(przychodniaMenu[0], ",\n")) +
    chalk_1.default.cyanBright("   ".concat(przychodniaMenu[1], ",\n")) +
    chalk_1.default.cyanBright("   ".concat(przychodniaMenu[2], ",\n")) +
    chalk_1.default.cyanBright("   ".concat(przychodniaMenu[3], ",\n")) +
    chalk_1.default.cyanBright("   ".concat(przychodniaMenu[4], ",\n")) +
    chalk_1.default.cyanBright("   ".concat(przychodniaMenu[5], ",\n")) +
    "\n" +
    "   Wybrana ".concat(chalk_1.default.underline("cyfra"), ": ");
var editMyAccountPattern = "\n" +
    "   Które dane chcesz edytować:\n" +
    "\n" +
    "   0.) Przerwij, \n" +
    "\n" +
    "   1.) Imię i nazwisko, \n" +
    "\n" +
    "   Wybrana ".concat(chalk_1.default.underline("cyfra"), ": ");
var addRoleToNewUser = "\n" +
    "   Wybierz rolę :\n" +
    "\n" +
    "   0.) Przerwij, \n" +
    "\n" +
    "   1.) read-only, \n" +
    "   2.) modify, \n" +
    "   3.) admin, \n" +
    "\n" +
    "   Wybrana ".concat(chalk_1.default.underline("cyfra"), ": ");
var addWorkPositionToNewUser = "\n" +
    "   Wybierz nazwę stanowiska:\n" +
    "\n" +
    "   0.) Przerwij, \n" +
    "\n" +
    "   1.) managerLVL1, \n" +
    "   2.) managerLVL2, \n" +
    "   3.) managerLVL3, \n" +
    "   4.) clinicEmployee, \n" +
    "   5.) itEmployee, \n" +
    "   6.) administrationEmployee, \n" +
    "   7.) contractor, \n" +
    "   8.) internShip, \n" +
    "   9.) admin, \n" +
    "\n" +
    "   Wybrana ".concat(chalk_1.default.underline("cyfra"), ": ");
var adminEditUserPattern = "\n" +
    "   Wybierz dane do edycji:\n" +
    "\n" +
    "   0.) Przerwij, \n" +
    "\n" +
    "   1.) Imię i nazwisko, \n" +
    "   2.) Stanowisko pracy, \n" +
    "   3.) Rola, \n" +
    "   4.) Hasło, \n" +
    "\n" +
    "   Wybrana ".concat(chalk_1.default.underline("cyfra"), ": ");
var ticketAction = "\n" +
    "   Czy chcesz realizować zgłoszenie:\n" +
    "\n" +
    "   1.) TAK, \n" +
    "   2.) NIE, \n" +
    "\n" +
    "   Wybrana ".concat(chalk_1.default.underline("cyfra"), ": ");
var patientToEditPattern = "\n" +
    "   Które dane chcesz edytować:\n" +
    "\n" +
    "   1.) Imię i nazwisko, \n" +
    "   2.) Pesel, \n" +
    "   3.) Płeć, \n" +
    "   4.) Adres [nazwa ulicy, numer domu, numer lokalu], \n" +
    "   5.) Kod pocztowy, nazwa miejscowości, \n" +
    "   6.) Numer telefonu, \n" +
    "   7.) Adres email, \n" +
    "   8.) Number carty pacjenta, \n" +
    "\n" +
    "   Wybrana ".concat(chalk_1.default.underline("cyfra"), ": ");
var selectGender = "\n" +
    "   Wybierz płeć:\n" +
    "\n" +
    "   1.) Kobieta, \n" +
    "   2.) Mężczyzna, \n" +
    "   3.) Inna, \n" +
    "\n" +
    "   Wybrana ".concat(chalk_1.default.underline("cyfra"), ": ");
var editMany = "\n" +
    "   Wybierz opcje edycji danych:\n" +
    "\n" +
    "   0.) Przerwij, \n" +
    "\n" +
    "   1.) Edytuj konkretne, \n" +
    "   2.) Edytuj wiele, \n" +
    "\n" +
    "   Wybrana ".concat(chalk_1.default.underline("cyfra"), ": ");
var clinicMenuType = "\n" +
    "   Wybierz typ obiektu medycznego:\n" +
    "\n" +
    "   1.) Szpital, \n" +
    "   2.) Przychodnia, \n" +
    "   3.) Klinika, \n" +
    "\n" +
    "   Wybrana ".concat(chalk_1.default.underline("cyfra"), ": ");
var addPatientToClinicMenu = "\n" +
    "   Czy chcesz dodać pacjentów:\n" +
    "\n" +
    "   1.) NIE, \n" +
    "   2.) TAK - Dodaje wiele, \n" +
    "   3.) TAK - Dodaję pojedynczo, \n" +
    "\n" +
    "   Wybrana ".concat(chalk_1.default.underline("cyfra"), ": ");
var editMenuClinic = "\n" +
    "   Które dane chcesz edytować:\n" +
    "\n" +
    "   0.) Przerwij, \n" +
    "\n" +
    "   1.) Nazwa placówki, \n" +
    "   2.) Adres, \n" +
    "   3.) Kod pocztowy i miasto, \n" +
    "   4.) Typ, \n" +
    "\n" +
    "   Wybrana ".concat(chalk_1.default.underline("cyfra"), ": ");
var ticketToEditPattern = "\n" +
    "   Które dane chcesz edytować:\n" +
    "\n" +
    "   0.) Przerwij, \n" +
    "\n" +
    "   1.) Kontent, \n" +
    "   2.) Status, \n" +
    "\n" +
    "   Wybrana ".concat(chalk_1.default.underline("cyfra"), ": ");
var ticketStatuses = "\n" +
    "   Wybierz status zgłoszenia:\n" +
    "\n" +
    "   0.) Przerwij, \n" +
    "\n" +
    "   1.) New, \n" +
    "   2.) Pending, \n" +
    "   3.) Closed, \n" +
    "\n" +
    "   Wybrana ".concat(chalk_1.default.underline("cyfra"), ": ");
var readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
var generateRandomPassword = function () {
    var length = 8;
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$^&*(){}[];:/|<>.,";
    var password = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
};
function askQuestion(question) {
    return new Promise(function (resolve) {
        readline.question(question, function (answer) {
            resolve(answer);
        });
    });
}
function backToMainMenu(mainRespons) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mainRespons = String(mainRespons);
                    if (!(switchUser === true)) return [3 /*break*/, 2];
                    return [4 /*yield*/, main()];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    if (!(mainRespons === "0" || mainRespons === 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, main()];
                case 3: return [2 /*return*/, _a.sent()];
                case 4:
                    if (!(mainRespons !== "0" || mainRespons !== "1" || mainRespons !== "2" || mainRespons !== "3" || mainRespons !== "4")) return [3 /*break*/, 8];
                    return [4 /*yield*/, console.log("")];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, console.log("   ".concat(chalk_1.default.redBright("Wybrany numer jest nieprawidłowy!. Sprawdź numer i Spróbuj ponownie.")))];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, main()];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 8: return [4 /*yield*/, main()];
                case 9: return [2 /*return*/, _a.sent()];
                case 10: return [2 /*return*/];
            }
        });
    });
}
var createEmailAddress = function (email) {
    var domena = "example.com";
    var _a = email.split(" "), name = _a[0], surname = _a[1];
    return "".concat(name.toLowerCase(), ".").concat(surname.toLowerCase(), "@").concat(domena);
};
var validRole = function () {
    if (currentUser.role === "read-only") {
        console.log("");
        console.log("   ".concat(chalk_1.default.redBright("Odmowa dostępu")));
        return backToMainMenu("0");
    }
};
var validValue = function (valueToCheck) {
    if (valueToCheck === "" || valueToCheck === null || valueToCheck === undefined) {
        console.log("");
        console.log("   ".concat(chalk_1.default.redBright("Nie wprowadzono żadnej wartości.")));
        return backToMainMenu("0");
    }
};
var personalIDValidator = function (personalID) {
    if (personalID.length < 8) {
        console.log("");
        console.log("   ".concat(chalk_1.default.redBright("Ilość znaków nie może być mniejsza niż 8.")));
        return backToMainMenu("0");
    }
};
var quantityValidator = function (valueToCheck) {
    if (valueToCheck.length < 5 || valueToCheck.length > 75) {
        console.log("");
        console.log("   ".concat(chalk_1.default.redBright("Podana ilość znaków jest nie prawidłowa.")));
        return backToMainMenu("0");
    }
};
var handleMyAccount = function (selectedOpt) { return __awaiter(void 0, void 0, void 0, function () {
    var myAccountResponse, duplicatedUserNameFounded_1, newRoleToRequest, newRoleForMe, _a, newRoleForMe, _b, newRequest, requestNotFound_1, ticketNumber_1, _c, newRoleForMe, _d, newRoleForMe, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                myAccountResponse = "";
                if (!(selectedOpt === "1")) return [3 /*break*/, 2];
                users.filter(function (item) {
                    if (currentUser.id === item.id) {
                        console.log("");
                        console.log("   ".concat(chalk_1.default.blueBright("Twoje dane to:"), "\n"));
                        console.log("   Imi\u0119 i nazwisko: ".concat(chalk_1.default.blueBright("".concat(item.name)), ","));
                        console.log("   Adres email: ".concat(chalk_1.default.blueBright("".concat(item.email)), ","));
                        console.log("   Rola: ".concat(chalk_1.default.blueBright("".concat(item.role)), ","));
                        console.log("   Stanowisko: ".concat(chalk_1.default.blueBright("".concat(item.workPosition, ","))));
                        console.log("");
                    }
                });
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 1:
                _g.sent();
                return [3 /*break*/, 104];
            case 2:
                if (!(selectedOpt === "2")) return [3 /*break*/, 16];
                return [4 /*yield*/, askQuestion(editMyAccountPattern)];
            case 3:
                myAccountResponse = _g.sent();
                return [4 /*yield*/, validValue(myAccountResponse)];
            case 4:
                _g.sent();
                if (!(myAccountResponse === "0")) return [3 /*break*/, 6];
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 5:
                _g.sent();
                return [3 /*break*/, 15];
            case 6:
                if (!(myAccountResponse === "1")) return [3 /*break*/, 13];
                duplicatedUserNameFounded_1 = false;
                console.log("");
                return [4 /*yield*/, askQuestion("   Wprowadź nowe imię i nazwisko: ")];
            case 7:
                myAccountResponse = _g.sent();
                return [4 /*yield*/, validValue(myAccountResponse)];
            case 8:
                _g.sent();
                return [4 /*yield*/, quantityValidator(myAccountResponse)];
            case 9:
                _g.sent();
                users.forEach(function (item) {
                    if (item.name === myAccountResponse) {
                        duplicatedUserNameFounded_1 = true;
                    }
                });
                if (!duplicatedUserNameFounded_1) return [3 /*break*/, 11];
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 10:
                _g.sent();
                _g.label = 11;
            case 11:
                users.forEach(function (item) {
                    if (currentUser.id === item.id) {
                        item.name = myAccountResponse;
                        item.email = createEmailAddress(item.name);
                        duplicatedUserNameFounded_1 = item.name;
                    }
                });
                console.log("");
                console.log("   ".concat(chalk_1.default.bgBlue("Twoje imię i nazwisko zostało zmienione pomyślnie na:\n")));
                console.log("   ".concat(chalk_1.default.blueBright("Nowe imię i nazwisko: ")).concat(duplicatedUserNameFounded_1));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 12:
                _g.sent();
                return [3 /*break*/, 15];
            case 13:
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 14:
                _g.sent();
                _g.label = 15;
            case 15: return [3 /*break*/, 104];
            case 16:
                if (!(selectedOpt === "3")) return [3 /*break*/, 42];
                newRoleToRequest = "";
                if (!(currentUser.role === "read-only")) return [3 /*break*/, 26];
                newRoleForMe = "\n" +
                    "   Wybierz rolę :\n" +
                    "\n" +
                    "   0.) Przerwij, \n" +
                    "\n" +
                    "   1.) modify, \n" +
                    "   2.) admin, \n" +
                    "\n" +
                    "   Wybrana ".concat(chalk_1.default.underline("cyfra"), ": ");
                return [4 /*yield*/, askQuestion(newRoleForMe)];
            case 17:
                myAccountResponse = _g.sent();
                return [4 /*yield*/, validValue(myAccountResponse)];
            case 18:
                _g.sent();
                _a = myAccountResponse;
                switch (_a) {
                    case "0": return [3 /*break*/, 19];
                    case "1": return [3 /*break*/, 21];
                    case "2": return [3 /*break*/, 22];
                }
                return [3 /*break*/, 23];
            case 19: return [4 /*yield*/, backToMainMenu(String("0"))];
            case 20:
                _g.sent();
                return [3 /*break*/, 25];
            case 21:
                newRoleToRequest = roles[1];
                return [3 /*break*/, 25];
            case 22:
                newRoleToRequest = roles[2];
                return [3 /*break*/, 25];
            case 23:
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 24:
                _g.sent();
                return [3 /*break*/, 25];
            case 25: return [3 /*break*/, 38];
            case 26:
                if (!(currentUser.role === "modify")) return [3 /*break*/, 36];
                newRoleForMe = "\n" +
                    "   Wybierz rolę :\n" +
                    "\n" +
                    "   0.) Przerwij, \n" +
                    "\n" +
                    "   1.) read-only, \n" +
                    "   2.) admin, \n" +
                    "\n" +
                    "   Wybrana ".concat(chalk_1.default.underline("cyfra"), ": ");
                return [4 /*yield*/, askQuestion(newRoleForMe)];
            case 27:
                myAccountResponse = _g.sent();
                return [4 /*yield*/, validValue(myAccountResponse)];
            case 28:
                _g.sent();
                _b = myAccountResponse;
                switch (_b) {
                    case "0": return [3 /*break*/, 29];
                    case "1": return [3 /*break*/, 31];
                    case "2": return [3 /*break*/, 32];
                }
                return [3 /*break*/, 33];
            case 29: return [4 /*yield*/, backToMainMenu(String("0"))];
            case 30:
                _g.sent();
                return [3 /*break*/, 35];
            case 31:
                newRoleToRequest = roles[0];
                return [3 /*break*/, 35];
            case 32:
                newRoleToRequest = roles[2];
                return [3 /*break*/, 35];
            case 33:
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 34:
                _g.sent();
                return [3 /*break*/, 35];
            case 35: return [3 /*break*/, 38];
            case 36:
                if (!(currentUser.role === "admin")) return [3 /*break*/, 38];
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Unexpected role error. Admin role can not be downgraded")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 37:
                _g.sent();
                _g.label = 38;
            case 38:
                newRequest = {
                    id: (0, uuid_1.v4)(),
                    name: currentUser.email,
                    date: (0, moment_1.default)().format('DD.MM.YYYY'),
                    content: "Prosz\u0119 o zmian\u0119 mojej roli z ".concat(currentUser.role, " na ").concat(newRoleToRequest, "."),
                    status: "Pending",
                };
                userRequests.push(newRequest);
                return [4 /*yield*/, console.log("")];
            case 39:
                _g.sent();
                return [4 /*yield*/, console.log("   ".concat(chalk_1.default.bgBlue("Twoje zgłoszenie zostało przesłane. Oczekuj proszę na kontakt w tej sprawie.\n")))];
            case 40:
                _g.sent();
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 41:
                _g.sent();
                return [3 /*break*/, 104];
            case 42:
                if (!(selectedOpt === "4")) return [3 /*break*/, 47];
                requestNotFound_1 = false;
                userRequests.filter(function (item) {
                    if (item.name === currentUser.email) {
                        console.log("");
                        console.log("   ID Zg\u0142oszenia: ".concat(chalk_1.default.bold.blackBright("".concat(chalk_1.default.yellowBright(item.id))), ","));
                        console.log("   Data utworzenia: ".concat(chalk_1.default.bold.blackBright("".concat(chalk_1.default.yellowBright(item.date))), ","));
                        console.log("   Zg\u0142aszaj\u0105cy: ".concat(chalk_1.default.bold.blackBright("".concat(chalk_1.default.yellowBright(item.name))), ","));
                        console.log("   Opis: ".concat(chalk_1.default.bold.blackBright("".concat(chalk_1.default.yellowBright(item.content))), ","));
                        console.log("   Status: ".concat(chalk_1.default.bold.blackBright("".concat(chalk_1.default.yellowBright(item.status))), ","));
                        console.log("");
                        requestNotFound_1 = true;
                    }
                });
                if (!!requestNotFound_1) return [3 /*break*/, 44];
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Obecnie nie posiadasz żadnych przesłanych zgłoszeń")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 43:
                _g.sent();
                return [3 /*break*/, 46];
            case 44: return [4 /*yield*/, backToMainMenu(String("0"))];
            case 45:
                _g.sent();
                _g.label = 46;
            case 46: return [3 /*break*/, 104];
            case 47:
                if (!(selectedOpt === "5")) return [3 /*break*/, 100];
                if (!(currentUser.role === "admin")) return [3 /*break*/, 49];
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Unexpected userError: Administratorzy nie posiadają zgłoszeń")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 48:
                _g.sent();
                _g.label = 49;
            case 49: return [4 /*yield*/, askQuestion("\n   Podaj numer zgłoszenia: ")];
            case 50:
                myAccountResponse = _g.sent();
                return [4 /*yield*/, validValue(myAccountResponse)];
            case 51:
                _g.sent();
                return [4 /*yield*/, quantityValidator(myAccountResponse)];
            case 52:
                _g.sent();
                ticketNumber_1 = myAccountResponse.trim();
                return [4 /*yield*/, askQuestion(ticketToEditPattern)];
            case 53:
                myAccountResponse = _g.sent();
                _c = myAccountResponse;
                switch (_c) {
                    case "0": return [3 /*break*/, 54];
                    case "1": return [3 /*break*/, 56];
                    case "2": return [3 /*break*/, 83];
                }
                return [3 /*break*/, 97];
            case 54: return [4 /*yield*/, backToMainMenu(String("0"))];
            case 55:
                _g.sent();
                return [3 /*break*/, 99];
            case 56:
                if (!(currentUser.role === "read-only")) return [3 /*break*/, 68];
                newRoleForMe = "\n" +
                    "   Wybierz rolę :\n" +
                    "\n" +
                    "   0.) Przerwij, \n" +
                    "\n" +
                    "   1.) modify, \n" +
                    "   2.) admin, \n" +
                    "\n" +
                    "   Wybrana ".concat(chalk_1.default.underline("cyfra"), ": ");
                return [4 /*yield*/, askQuestion(newRoleForMe)];
            case 57:
                myAccountResponse = _g.sent();
                return [4 /*yield*/, validValue(myAccountResponse)];
            case 58:
                _g.sent();
                _d = myAccountResponse;
                switch (_d) {
                    case "0": return [3 /*break*/, 59];
                    case "1": return [3 /*break*/, 61];
                    case "2": return [3 /*break*/, 63];
                }
                return [3 /*break*/, 65];
            case 59: return [4 /*yield*/, backToMainMenu(String("0"))];
            case 60:
                _g.sent();
                return [3 /*break*/, 67];
            case 61:
                userRequests.forEach(function (item) {
                    if (item.id === ticketNumber_1) {
                        item.content = "Prosz\u0119 o zmian\u0119 mojej roli z ".concat(currentUser.role, " na ").concat(roles[1], ".");
                    }
                });
                console.log("");
                console.log("\n   ".concat(chalk_1.default.blueBright("Twoje zgłoszenie zostało pomyślnie zaktualizowane.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 62:
                _g.sent();
                return [3 /*break*/, 67];
            case 63:
                userRequests.forEach(function (item) {
                    if (item.id === ticketNumber_1) {
                        item.content = "Prosz\u0119 o zmian\u0119 mojej roli z ".concat(currentUser.role, " na ").concat(roles[2], ".");
                    }
                });
                console.log("");
                console.log("\n   ".concat(chalk_1.default.blueBright("Twoje zgłoszenie zostało pomyślnie zaktualizowane.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 64:
                _g.sent();
                return [3 /*break*/, 67];
            case 65:
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 66:
                _g.sent();
                return [3 /*break*/, 67];
            case 67: return [3 /*break*/, 82];
            case 68:
                if (!(currentUser.role === "modify")) return [3 /*break*/, 80];
                newRoleForMe = "\n" +
                    "   Wybierz rolę :\n" +
                    "\n" +
                    "   0.) Przerwij, \n" +
                    "\n" +
                    "   1.) read-only, \n" +
                    "   2.) admin, \n" +
                    "\n" +
                    "   Wybrana ".concat(chalk_1.default.underline("cyfra"), ": ");
                return [4 /*yield*/, askQuestion(newRoleForMe)];
            case 69:
                myAccountResponse = _g.sent();
                return [4 /*yield*/, validValue(myAccountResponse)];
            case 70:
                _g.sent();
                _e = myAccountResponse;
                switch (_e) {
                    case "0": return [3 /*break*/, 71];
                    case "1": return [3 /*break*/, 73];
                    case "2": return [3 /*break*/, 75];
                }
                return [3 /*break*/, 77];
            case 71: return [4 /*yield*/, backToMainMenu(String("0"))];
            case 72:
                _g.sent();
                return [3 /*break*/, 79];
            case 73:
                userRequests.forEach(function (item) {
                    if (item.id === ticketNumber_1) {
                        item.content = "Prosz\u0119 o zmian\u0119 mojej roli z ".concat(item.content, " na ").concat(roles[0], ".");
                    }
                });
                console.log("");
                console.log("\n   ".concat(chalk_1.default.blueBright("Twoje zgłoszenie zostało pomyślnie zaktualizowane.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 74:
                _g.sent();
                return [3 /*break*/, 79];
            case 75:
                userRequests.forEach(function (item) {
                    if (item.id === ticketNumber_1) {
                        item.content = "Prosz\u0119 o zmian\u0119 mojej roli z ".concat(item.content, " na ").concat(roles[2], ".");
                    }
                });
                console.log("");
                console.log("\n   ".concat(chalk_1.default.blueBright("Twoje zgłoszenie zostało pomyślnie zaktualizowane.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 76:
                _g.sent();
                return [3 /*break*/, 79];
            case 77:
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 78:
                _g.sent();
                return [3 /*break*/, 79];
            case 79: return [3 /*break*/, 82];
            case 80:
                if (!(currentUser.role === "admin")) return [3 /*break*/, 82];
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Unexpected userError: Administratorzy nie tworzą i nie edytują zgłoszeń do siebie samych.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 81:
                _g.sent();
                _g.label = 82;
            case 82: return [3 /*break*/, 99];
            case 83: return [4 /*yield*/, askQuestion(ticketStatuses)];
            case 84:
                myAccountResponse = _g.sent();
                return [4 /*yield*/, validValue(myAccountResponse)];
            case 85:
                _g.sent();
                _f = myAccountResponse;
                switch (_f) {
                    case "0": return [3 /*break*/, 86];
                    case "1": return [3 /*break*/, 88];
                    case "2": return [3 /*break*/, 90];
                    case "3": return [3 /*break*/, 92];
                }
                return [3 /*break*/, 94];
            case 86: return [4 /*yield*/, backToMainMenu(String("0"))];
            case 87:
                _g.sent();
                return [3 /*break*/, 96];
            case 88:
                userRequests.forEach(function (item) {
                    if (item.id === ticketNumber_1) {
                        item.status = "New";
                    }
                });
                console.log("");
                console.log("\n   ".concat(chalk_1.default.blueBright("Twoje zgłoszenie zostało pomyślnie zaktualizowane.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 89:
                _g.sent();
                return [3 /*break*/, 96];
            case 90:
                userRequests.forEach(function (item) {
                    if (item.id === ticketNumber_1) {
                        item.status = "Pending";
                    }
                });
                console.log("");
                console.log("\n   ".concat(chalk_1.default.blueBright("Twoje zgłoszenie zostało pomyślnie zaktualizowane.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 91:
                _g.sent();
                return [3 /*break*/, 96];
            case 92:
                userRequests.forEach(function (item) {
                    if (item.id === ticketNumber_1) {
                        item.status = "Closed";
                    }
                });
                console.log("");
                console.log("\n   ".concat(chalk_1.default.blueBright("Twoje zgłoszenie zostało pomyślnie zaktualizowane.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 93:
                _g.sent();
                return [3 /*break*/, 96];
            case 94:
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 95:
                _g.sent();
                return [3 /*break*/, 96];
            case 96: return [3 /*break*/, 99];
            case 97:
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 98:
                _g.sent();
                return [3 /*break*/, 99];
            case 99: return [3 /*break*/, 104];
            case 100:
                if (!(selectedOpt === "0")) return [3 /*break*/, 102];
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 101:
                _g.sent();
                return [3 /*break*/, 104];
            case 102:
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 103:
                _g.sent();
                _g.label = 104;
            case 104: return [2 /*return*/];
        }
    });
}); };
var handleAdminMenu = function (selectedOpt) { return __awaiter(void 0, void 0, void 0, function () {
    var adminAccountResponse, tempArr, _a, _b, createdEmailAddress, password, salt, passwordHash, newUserToAdd, userToRemove_1, index, editedEmailForTickets_1, newEmailToAssign_1, flag1_1, userToChange, _c, userNameToFind_1, newUserName_1, flag_1, userNameToFind2_1, editedWorkPositionUser_1, _d, userNameToFind3_1, userRoleToEdit_1, flagRoleEditing_1, _e, userNameToFind4_1, passwordChange_1, userNameToFind5_1, foundUser_1, requestToClose_1, selectedRole_1, ticketResponse, ticketSender_1;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                adminAccountResponse = "";
                tempArr = [];
                if (!(selectedOpt === "1")) return [3 /*break*/, 31];
                return [4 /*yield*/, askQuestion("\n   1.) Podaj imię i nazwisko: ")];
            case 1:
                adminAccountResponse = _f.sent();
                return [4 /*yield*/, validValue(adminAccountResponse)];
            case 2:
                _f.sent();
                return [4 /*yield*/, quantityValidator(adminAccountResponse)];
            case 3:
                _f.sent();
                users.forEach(function (item) {
                    if (item.name === adminAccountResponse) {
                        adminAccountResponse = "".concat(adminAccountResponse).concat(Math.floor(Math.random() * 100) + 1);
                    }
                });
                tempArr.push(adminAccountResponse);
                return [4 /*yield*/, askQuestion(addRoleToNewUser)];
            case 4:
                adminAccountResponse = _f.sent();
                return [4 /*yield*/, validValue(adminAccountResponse)];
            case 5:
                _f.sent();
                _a = adminAccountResponse;
                switch (_a) {
                    case "0": return [3 /*break*/, 6];
                    case "1": return [3 /*break*/, 8];
                    case "2": return [3 /*break*/, 9];
                    case "3": return [3 /*break*/, 10];
                }
                return [3 /*break*/, 11];
            case 6: return [4 /*yield*/, backToMainMenu(String("0"))];
            case 7:
                _f.sent();
                return [3 /*break*/, 13];
            case 8:
                tempArr.push(roles[0]);
                return [3 /*break*/, 13];
            case 9:
                tempArr.push(roles[1]);
                return [3 /*break*/, 13];
            case 10:
                tempArr.push(roles[2]);
                return [3 /*break*/, 13];
            case 11:
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 12:
                _f.sent();
                return [3 /*break*/, 13];
            case 13:
                console.log("");
                return [4 /*yield*/, askQuestion(addWorkPositionToNewUser)];
            case 14:
                adminAccountResponse = _f.sent();
                return [4 /*yield*/, validValue(adminAccountResponse)];
            case 15:
                _f.sent();
                _b = adminAccountResponse;
                switch (_b) {
                    case "0": return [3 /*break*/, 16];
                    case "1": return [3 /*break*/, 18];
                    case "2": return [3 /*break*/, 19];
                    case "3": return [3 /*break*/, 20];
                    case "4": return [3 /*break*/, 21];
                    case "5": return [3 /*break*/, 22];
                    case "6": return [3 /*break*/, 23];
                    case "7": return [3 /*break*/, 24];
                    case "8": return [3 /*break*/, 25];
                    case "9": return [3 /*break*/, 26];
                }
                return [3 /*break*/, 27];
            case 16: return [4 /*yield*/, backToMainMenu(String("0"))];
            case 17:
                _f.sent();
                return [3 /*break*/, 29];
            case 18:
                tempArr.push(workPositions[0]);
                return [3 /*break*/, 29];
            case 19:
                tempArr.push(workPositions[1]);
                return [3 /*break*/, 29];
            case 20:
                tempArr.push(workPositions[2]);
                return [3 /*break*/, 29];
            case 21:
                tempArr.push(workPositions[3]);
                return [3 /*break*/, 29];
            case 22:
                tempArr.push(workPositions[4]);
                return [3 /*break*/, 29];
            case 23:
                tempArr.push(workPositions[5]);
                return [3 /*break*/, 29];
            case 24:
                tempArr.push(workPositions[6]);
                return [3 /*break*/, 29];
            case 25:
                tempArr.push(workPositions[7]);
                return [3 /*break*/, 29];
            case 26:
                tempArr.push(workPositions[8]);
                return [3 /*break*/, 29];
            case 27:
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 28:
                _f.sent();
                return [3 /*break*/, 29];
            case 29:
                console.log("");
                tempArr.push(adminAccountResponse);
                createdEmailAddress = createEmailAddress(tempArr[0]);
                password = generateRandomPassword();
                salt = bcryptjs_1.default.genSaltSync(10);
                passwordHash = bcryptjs_1.default.hashSync(password, salt);
                newUserToAdd = {
                    id: (0, uuid_1.v4)(),
                    name: tempArr[0],
                    password: password,
                    passwordHash: passwordHash,
                    salt: salt,
                    email: createdEmailAddress,
                    role: tempArr[1],
                    workPosition: tempArr[2],
                    createdAt: String((0, moment_1.default)().format('DD.MM.YYYY')),
                };
                users.push(newUserToAdd);
                console.log("");
                console.log("   ".concat(chalk_1.default.blueBright("########################################################")));
                console.log("   ".concat(chalk_1.default.blueBright("########################################################"), "\n"));
                console.log("   ".concat(chalk_1.default.bold.bgBlue(" Nowy użytkownik został dodany do bazy pomyślnie \n")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 30:
                _f.sent();
                return [3 /*break*/, 139];
            case 31:
                if (!(selectedOpt === "2")) return [3 /*break*/, 46];
                userToRemove_1 = "";
                return [4 /*yield*/, askQuestion("\n   Podaj nazwę użytkownika którego chcesz usunąć: ")];
            case 32:
                adminAccountResponse = _f.sent();
                return [4 /*yield*/, validValue(adminAccountResponse)];
            case 33:
                _f.sent();
                return [4 /*yield*/, quantityValidator(adminAccountResponse)];
            case 34:
                _f.sent();
                if (!(currentUser.name === adminAccountResponse)) return [3 /*break*/, 36];
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Nie można usunąć siebie samego będąc zalogowanym.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 35:
                _f.sent();
                return [3 /*break*/, 38];
            case 36:
                if (!(adminAccountResponse === "admin")) return [3 /*break*/, 38];
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Konto master admin nie może zostać usunięte.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 37:
                _f.sent();
                _f.label = 38;
            case 38:
                users.filter(function (item) {
                    if (adminAccountResponse === item.name) {
                        userToRemove_1 = item.email;
                        return;
                    }
                });
                return [4 /*yield*/, askQuestion(chalk_1.default.redBright("\n   Przepisz adres email u\u017Cytkownika w celu usuni\u0119cia go z bazy\n   [ ".concat(chalk_1.default.cyanBright("".concat(userToRemove_1)), " ]: ")))];
            case 39:
                adminAccountResponse = _f.sent();
                return [4 /*yield*/, validValue(adminAccountResponse)];
            case 40:
                _f.sent();
                return [4 /*yield*/, quantityValidator(adminAccountResponse)];
            case 41:
                _f.sent();
                if (!(adminAccountResponse === userToRemove_1)) return [3 /*break*/, 43];
                index = users.findIndex(function (item) { return item.email === userToRemove_1; });
                if (index !== -1) {
                    users.splice(index, 1);
                }
                console.log("");
                console.log("   ".concat(chalk_1.default.bold.bgRed("Użytkownik został pomyślnie usunięty.\n")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 42:
                _f.sent();
                return [3 /*break*/, 45];
            case 43:
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Podana wartość jest nie prawidłowa. Użytkownik nie został usunięty.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 44:
                _f.sent();
                _f.label = 45;
            case 45: return [3 /*break*/, 139];
            case 46:
                if (!(selectedOpt === "3")) return [3 /*break*/, 110];
                editedEmailForTickets_1 = "";
                newEmailToAssign_1 = "";
                return [4 /*yield*/, askQuestion("\n   Podaj nazwę użytkownika którego chcesz edytować: ")];
            case 47:
                adminAccountResponse = _f.sent();
                return [4 /*yield*/, validValue(adminAccountResponse)];
            case 48:
                _f.sent();
                return [4 /*yield*/, quantityValidator(adminAccountResponse)];
            case 49:
                _f.sent();
                flag1_1 = false;
                users.forEach(function (item) {
                    if (item.name === adminAccountResponse) {
                        return flag1_1 = true;
                    }
                });
                if (!(flag1_1 === false)) return [3 /*break*/, 51];
                console.log("\n   ".concat(chalk_1.default.redBright("Podana nazwa u\u017Cytkownika nie zosta\u0142a odnaleziona w bazie. Sprawd\u017A nazw\u0119 lub dodaj u\u017Cytkownika.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 50:
                _f.sent();
                _f.label = 51;
            case 51:
                userToChange = adminAccountResponse;
                return [4 /*yield*/, askQuestion(adminEditUserPattern)];
            case 52:
                adminAccountResponse = _f.sent();
                return [4 /*yield*/, validValue(adminAccountResponse)];
            case 53:
                _f.sent();
                _c = adminAccountResponse;
                switch (_c) {
                    case "0": return [3 /*break*/, 54];
                    case "1": return [3 /*break*/, 56];
                    case "2": return [3 /*break*/, 67];
                    case "3": return [3 /*break*/, 86];
                    case "4": return [3 /*break*/, 99];
                }
                return [3 /*break*/, 107];
            case 54: return [4 /*yield*/, backToMainMenu(String("0"))];
            case 55:
                _f.sent();
                return [3 /*break*/, 109];
            case 56:
                userNameToFind_1 = userToChange;
                return [4 /*yield*/, askQuestion("\n   1.) Podaj nową nazwę użytkownika: ")];
            case 57:
                adminAccountResponse = _f.sent();
                if (!(adminAccountResponse.trim() === userToChange.trim())) return [3 /*break*/, 59];
                console.log("\n   ".concat(chalk_1.default.redBright("Podana wartość musi różnić się od aktualnie zapisanej.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 58:
                _f.sent();
                _f.label = 59;
            case 59: return [4 /*yield*/, validValue(adminAccountResponse)];
            case 60:
                _f.sent();
                return [4 /*yield*/, quantityValidator(adminAccountResponse)];
            case 61:
                _f.sent();
                newUserName_1 = adminAccountResponse;
                flag_1 = false;
                users.forEach(function (user) {
                    if (user.name === newUserName_1) {
                        console.log("   ".concat(chalk_1.default.redBright("Podana nazwa u\u017Cytkownika ju\u017C istnieje w bazie")));
                        return flag_1 = true;
                    }
                });
                if (!flag_1) return [3 /*break*/, 63];
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 62:
                _f.sent();
                return [3 /*break*/, 64];
            case 63:
                users.forEach(function (user) {
                    if (userNameToFind_1 === user.name) {
                        flag_1 = true;
                        user.name = newUserName_1;
                        editedEmailForTickets_1 = user.email;
                        user.email = createEmailAddress(user.name);
                        newEmailToAssign_1 = user.email;
                    }
                });
                userRequests.forEach(function (request) {
                    if (request.name === editedEmailForTickets_1) {
                        request.name = newEmailToAssign_1;
                    }
                });
                _f.label = 64;
            case 64:
                if (!flag_1) return [3 /*break*/, 66];
                console.log("");
                console.log("   ".concat(chalk_1.default.blueBright("Stara nazwa u\u017Cytkownika: ".concat(chalk_1.default.redBright("".concat(userNameToFind_1)), "\n   zosta\u0142a pomy\u015Blnie zmieniona na: ").concat(chalk_1.default.greenBright("".concat(newUserName_1))))));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 65:
                _f.sent();
                _f.label = 66;
            case 66: return [3 /*break*/, 109];
            case 67:
                userNameToFind2_1 = userToChange;
                return [4 /*yield*/, askQuestion(addWorkPositionToNewUser)];
            case 68:
                adminAccountResponse = _f.sent();
                return [4 /*yield*/, validValue(adminAccountResponse)];
            case 69:
                _f.sent();
                editedWorkPositionUser_1 = "";
                _d = adminAccountResponse;
                switch (_d) {
                    case "0": return [3 /*break*/, 70];
                    case "1": return [3 /*break*/, 72];
                    case "2": return [3 /*break*/, 73];
                    case "3": return [3 /*break*/, 74];
                    case "4": return [3 /*break*/, 75];
                    case "5": return [3 /*break*/, 76];
                    case "6": return [3 /*break*/, 77];
                    case "7": return [3 /*break*/, 78];
                    case "8": return [3 /*break*/, 79];
                    case "9": return [3 /*break*/, 80];
                }
                return [3 /*break*/, 81];
            case 70: return [4 /*yield*/, backToMainMenu(String("0"))];
            case 71:
                _f.sent();
                return [3 /*break*/, 83];
            case 72:
                editedWorkPositionUser_1 = workPositions[0];
                return [3 /*break*/, 83];
            case 73:
                editedWorkPositionUser_1 = workPositions[1];
                return [3 /*break*/, 83];
            case 74:
                editedWorkPositionUser_1 = workPositions[2];
                return [3 /*break*/, 83];
            case 75:
                editedWorkPositionUser_1 = workPositions[3];
                return [3 /*break*/, 83];
            case 76:
                editedWorkPositionUser_1 = workPositions[4];
                return [3 /*break*/, 83];
            case 77:
                editedWorkPositionUser_1 = workPositions[5];
                return [3 /*break*/, 83];
            case 78:
                editedWorkPositionUser_1 = workPositions[6];
                return [3 /*break*/, 83];
            case 79:
                editedWorkPositionUser_1 = workPositions[7];
                return [3 /*break*/, 83];
            case 80:
                editedWorkPositionUser_1 = workPositions[8];
                return [3 /*break*/, 83];
            case 81:
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 82:
                _f.sent();
                return [3 /*break*/, 83];
            case 83: return [4 /*yield*/, users.forEach(function (user) {
                    if (user.name === userNameToFind2_1) {
                        user.workPosition = editedWorkPositionUser_1;
                        console.log("");
                        console.log("   ".concat(chalk_1.default.blueBright("Poprzednie stanowisko zosta\u0142o pomy\u015Blnie zmienione na: ".concat(chalk_1.default.greenBright("".concat(editedWorkPositionUser_1)), "\n"))));
                    }
                })];
            case 84:
                _f.sent();
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 85:
                _f.sent();
                return [3 /*break*/, 109];
            case 86:
                userNameToFind3_1 = userToChange;
                return [4 /*yield*/, askQuestion(addRoleToNewUser)];
            case 87:
                adminAccountResponse = _f.sent();
                return [4 /*yield*/, validValue(adminAccountResponse)];
            case 88:
                _f.sent();
                userRoleToEdit_1 = "";
                flagRoleEditing_1 = false;
                _e = adminAccountResponse;
                switch (_e) {
                    case "0": return [3 /*break*/, 89];
                    case "1": return [3 /*break*/, 91];
                    case "2": return [3 /*break*/, 92];
                    case "3": return [3 /*break*/, 93];
                }
                return [3 /*break*/, 94];
            case 89: return [4 /*yield*/, backToMainMenu(String("0"))];
            case 90:
                _f.sent();
                return [3 /*break*/, 96];
            case 91:
                userRoleToEdit_1 = roles[0];
                return [3 /*break*/, 96];
            case 92:
                userRoleToEdit_1 = roles[1];
                return [3 /*break*/, 96];
            case 93:
                userRoleToEdit_1 = roles[2];
                return [3 /*break*/, 96];
            case 94:
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 95:
                _f.sent();
                return [3 /*break*/, 96];
            case 96:
                users.forEach(function (user) {
                    if (userNameToFind3_1 === user.name) {
                        flagRoleEditing_1 = true;
                        user.role = userRoleToEdit_1;
                    }
                });
                if (!flagRoleEditing_1) return [3 /*break*/, 98];
                console.log("");
                console.log("   ".concat(chalk_1.default.blueBright("Poprzednia rola zosta\u0142a pomy\u015Blnie zmieniona na: ".concat(chalk_1.default.greenBright("".concat(userRoleToEdit_1)), "\n"))));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 97:
                _f.sent();
                _f.label = 98;
            case 98: return [3 /*break*/, 109];
            case 99:
                userNameToFind4_1 = userToChange;
                passwordChange_1 = false;
                return [4 /*yield*/, askQuestion("\n   Podaj nowe hasło: ")];
            case 100:
                adminAccountResponse = _f.sent();
                return [4 /*yield*/, validValue(adminAccountResponse)];
            case 101:
                _f.sent();
                return [4 /*yield*/, personalIDValidator(adminAccountResponse)];
            case 102:
                _f.sent();
                users.forEach(function (user) {
                    if (userNameToFind4_1 === user.name) {
                        user.password = adminAccountResponse;
                        passwordChange_1 = true;
                    }
                });
                if (!passwordChange_1) return [3 /*break*/, 104];
                console.log("");
                console.log("   ".concat(chalk_1.default.cyanBright("Has\u0142o u\u017Cytkownika: [ ".concat(chalk_1.default.redBright("".concat(userNameToFind4_1)), " ] zosta\u0142o pomy\u015Blnie zmienione\n"))));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 103:
                _f.sent();
                return [3 /*break*/, 106];
            case 104:
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Nie udało się zmienić hasła. Pracownik nie zostało odnaleziony w bazie")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 105:
                _f.sent();
                _f.label = 106;
            case 106: return [3 /*break*/, 109];
            case 107:
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 108:
                _f.sent();
                return [3 /*break*/, 109];
            case 109: return [3 /*break*/, 139];
            case 110:
                if (!(selectedOpt === "4")) return [3 /*break*/, 112];
                users.forEach(function (user) {
                    console.log("");
                    console.log("   ".concat(chalk_1.default.blackBright("dbID:"), " ").concat(chalk_1.default.yellowBright(user.id)));
                    console.log("   ".concat(chalk_1.default.blackBright("dodano:"), " ").concat(chalk_1.default.yellowBright(user.createdAt)));
                    console.log("   ".concat(chalk_1.default.blackBright("Użytkownik:"), " ").concat(chalk_1.default.yellowBright(user.name)));
                    console.log("   ".concat(chalk_1.default.blackBright("Adres email:"), " ").concat(chalk_1.default.yellowBright(user.email)));
                    console.log("   ".concat(chalk_1.default.blackBright("Rola:"), " ").concat(chalk_1.default.yellowBright(user.role)));
                    console.log("   ".concat(chalk_1.default.blackBright("Stanowisko:"), " ").concat(chalk_1.default.yellowBright(user.workPosition)));
                    console.log("   ".concat(chalk_1.default.blackBright("password:"), " ").concat(chalk_1.default.greenBright(user.password)));
                    console.log("   ".concat(chalk_1.default.blackBright("hash:"), " ").concat(chalk_1.default.greenBright(user.passwordHash)));
                    console.log("   ".concat(chalk_1.default.blackBright("salt:"), " ").concat(chalk_1.default.greenBright(user.salt)));
                    console.log("");
                });
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 111:
                _f.sent();
                return [3 /*break*/, 139];
            case 112:
                if (!(selectedOpt === "5")) return [3 /*break*/, 119];
                return [4 /*yield*/, askQuestion("\n   Podaj nazwę użytkownika którego chcesz znaleźć: ")];
            case 113:
                adminAccountResponse = _f.sent();
                return [4 /*yield*/, validValue(adminAccountResponse)];
            case 114:
                _f.sent();
                return [4 /*yield*/, quantityValidator(adminAccountResponse)];
            case 115:
                _f.sent();
                userNameToFind5_1 = adminAccountResponse;
                foundUser_1 = false;
                users.filter(function (user) {
                    if (userNameToFind5_1 === user.name) {
                        foundUser_1 = true;
                        console.log("");
                        console.log("   ".concat(chalk_1.default.blackBright("dbID:"), " ").concat(chalk_1.default.yellowBright(user.id)));
                        console.log("   ".concat(chalk_1.default.blackBright("dodano:"), " ").concat(chalk_1.default.yellowBright(user.createdAt)));
                        console.log("   ".concat(chalk_1.default.blackBright("Użytkownik:"), " ").concat(chalk_1.default.yellowBright(user.name)));
                        console.log("   ".concat(chalk_1.default.blackBright("Adres email:"), " ").concat(chalk_1.default.yellowBright(user.email)));
                        console.log("   ".concat(chalk_1.default.blackBright("Rola:"), " ").concat(chalk_1.default.yellowBright(user.role)));
                        console.log("   ".concat(chalk_1.default.blackBright("Stanowisko:"), " ").concat(chalk_1.default.yellowBright(user.workPosition)));
                        console.log("   ".concat(chalk_1.default.blackBright("password:"), " ").concat(chalk_1.default.greenBright(user.password)));
                        console.log("   ".concat(chalk_1.default.blackBright("hash:"), " ").concat(chalk_1.default.greenBright(user.passwordHash)));
                        console.log("   ".concat(chalk_1.default.blackBright("salt:"), " ").concat(chalk_1.default.greenBright(user.salt)));
                    }
                });
                if (!!foundUser_1) return [3 /*break*/, 117];
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Użytkownik o podanej nazwie nie został odnaleziony w bazie. Sprawdź nazwę i spróbuj ponownie.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 116:
                _f.sent();
                _f.label = 117;
            case 117:
                console.log("");
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 118:
                _f.sent();
                return [3 /*break*/, 139];
            case 119:
                if (!(selectedOpt === "6")) return [3 /*break*/, 135];
                requestToClose_1 = "";
                selectedRole_1 = "";
                if (!(userRequests.length === 0)) return [3 /*break*/, 121];
                console.log("");
                console.log("   ".concat(chalk_1.default.bold.yellowBright("Obecnie nie ma żadnych zgłoszeń")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 120:
                _f.sent();
                return [3 /*break*/, 134];
            case 121:
                userRequests.forEach(function (item) {
                    console.log("");
                    console.log("   ID Zg\u0142oszenia: ".concat(chalk_1.default.bold.blackBright("".concat(chalk_1.default.yellowBright(item.id))), ","));
                    console.log("   Data utworzenia: ".concat(chalk_1.default.bold.blackBright("".concat(chalk_1.default.yellowBright(item.date))), ","));
                    console.log("   Zg\u0142aszaj\u0105cy: ".concat(chalk_1.default.bold.blackBright("".concat(chalk_1.default.yellowBright(item.name))), ","));
                    console.log("   Opis: ".concat(chalk_1.default.bold.blackBright("".concat(chalk_1.default.yellowBright(item.content))), ","));
                    console.log("   Status: ".concat(chalk_1.default.bold.blackBright("".concat(chalk_1.default.yellowBright(item.status))), ","));
                    console.log("");
                });
                return [4 /*yield*/, askQuestion(ticketAction)];
            case 122:
                adminAccountResponse = _f.sent();
                return [4 /*yield*/, validValue(adminAccountResponse)];
            case 123:
                _f.sent();
                ticketResponse = adminAccountResponse;
                if (!(ticketResponse === "1")) return [3 /*break*/, 130];
                return [4 /*yield*/, askQuestion("\n   Podaj ID zgłoszenia: ")];
            case 124:
                adminAccountResponse = _f.sent();
                return [4 /*yield*/, validValue(adminAccountResponse)];
            case 125:
                _f.sent();
                return [4 /*yield*/, quantityValidator(adminAccountResponse)];
            case 126:
                _f.sent();
                ticketSender_1 = "";
                userRequests.forEach(function (item) {
                    if (adminAccountResponse === item.id) {
                        requestToClose_1 = item.id;
                        ticketSender_1 = item.name;
                    }
                });
                return [4 /*yield*/, askQuestion(addRoleToNewUser)];
            case 127:
                adminAccountResponse = _f.sent();
                return [4 /*yield*/, validValue(adminAccountResponse)];
            case 128:
                _f.sent();
                switch (adminAccountResponse) {
                    case "1":
                        selectedRole_1 = roles[0];
                        break;
                    case "2":
                        selectedRole_1 = roles[1];
                        break;
                    case "3":
                        selectedRole_1 = roles[2];
                        break;
                    default:
                }
                users.forEach(function (user) {
                    if (ticketSender_1 === user.email) {
                        user.role = selectedRole_1;
                        return;
                    }
                });
                userRequests.forEach(function (item) {
                    if (item.id === requestToClose_1) {
                        item.status = "Closed [ ".concat((0, moment_1.default)().format('DD-MM-YYYY HH:mm:ss'), " ]");
                    }
                });
                console.log("");
                console.log("   ".concat(chalk_1.default.blueBright("Rola u\u017Cytkownika: ".concat(chalk_1.default.blueBright("".concat(ticketSender_1)), " zosta\u0142a zmieniona na: ").concat(chalk_1.default.blueBright("".concat(selectedRole_1))))));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 129:
                _f.sent();
                return [3 /*break*/, 134];
            case 130:
                if (!(ticketResponse === "2")) return [3 /*break*/, 132];
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 131:
                _f.sent();
                return [3 /*break*/, 134];
            case 132:
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 133:
                _f.sent();
                _f.label = 134;
            case 134: return [3 /*break*/, 139];
            case 135:
                if (!(selectedOpt === "0")) return [3 /*break*/, 137];
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 136:
                _f.sent();
                return [3 /*break*/, 139];
            case 137:
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 138:
                _f.sent();
                _f.label = 139;
            case 139: return [2 /*return*/];
        }
    });
}); };
var handlePatientMenu = function (selectedOpt) { return __awaiter(void 0, void 0, void 0, function () {
    var patientResponseMenu, tempArrPatient, tempArrHelper, foundPersonalID, newPatient, givenPatientID_1, foundPatient_1, _a, tempAdr, tempAdr1, tempArrPatientEdit_1, tempArrHelperEdit, tempArrTransfer_1, tempArrPatient_1, patientToTransfer_1, lastClinic_1, patientToRemove_1, patientID_1, index;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                patientResponseMenu = "";
                tempArrPatient = [];
                tempArrHelper = [];
                foundPersonalID = false;
                if (!(selectedOpt === "1")) return [3 /*break*/, 31];
                return [4 /*yield*/, validRole()];
            case 1:
                _b.sent();
                return [4 /*yield*/, askQuestion("\n   1.) Podaj imię i nazwisko pacjenta: ")];
            case 2:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 3:
                _b.sent();
                return [4 /*yield*/, quantityValidator(patientResponseMenu)];
            case 4:
                _b.sent();
                tempArrPatient.push(patientResponseMenu);
                return [4 /*yield*/, askQuestion("\n   2.) Pesel: ")];
            case 5:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 6:
                _b.sent();
                return [4 /*yield*/, personalIDValidator(patientResponseMenu)];
            case 7:
                _b.sent();
                patients.forEach(function (patient) {
                    if (patient.personalID === patientResponseMenu) {
                        console.log("\n   ".concat(chalk_1.default.redBright("Pacjent o podanym numerze pesel już istnieje w bazie")));
                        foundPersonalID = true;
                    }
                });
                if (!foundPersonalID) return [3 /*break*/, 9];
                foundPersonalID = false;
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 8:
                _b.sent();
                _b.label = 9;
            case 9:
                tempArrPatient.push(patientResponseMenu);
                return [4 /*yield*/, askQuestion(selectGender)];
            case 10:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 11:
                _b.sent();
                if (patientResponseMenu === "1") {
                    tempArrPatient.push("Kobieta");
                }
                else if (patientResponseMenu === "2") {
                    tempArrPatient.push("Mężczyzna");
                }
                else if (patientResponseMenu === "2") {
                    tempArrPatient.push("Inna");
                }
                else {
                    tempArrPatient.push("Inna");
                }
                return [4 /*yield*/, askQuestion("\n   4.) Pełna nazwa ulicy [dodaj przedrostek] : ")];
            case 12:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 13:
                _b.sent();
                return [4 /*yield*/, quantityValidator(patientResponseMenu)];
            case 14:
                _b.sent();
                tempArrHelper.push(patientResponseMenu);
                return [4 /*yield*/, askQuestion("\n   5.) Numer [domu, budynku, bloku] : ")];
            case 15:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 16:
                _b.sent();
                tempArrHelper.push(patientResponseMenu);
                return [4 /*yield*/, askQuestion("\n   6.) Numer lokalu [wpisz: brak jeżeli nie ma] : ")];
            case 17:
                patientResponseMenu = _b.sent();
                tempArrHelper.push(patientResponseMenu);
                if (tempArrHelper[2] === undefined || tempArrHelper[2] === null || tempArrHelper[2] === "" || tempArrHelper[2].length === 0 || tempArrHelper[2] === "brak") {
                    tempArrHelper.pop();
                }
                if (tempArrHelper.length === 2) {
                    tempArrPatient.push("".concat(tempArrHelper[0], " ").concat(tempArrHelper[1]));
                }
                else if (tempArrHelper.length === 3) {
                    tempArrPatient.push("".concat(tempArrHelper[0], " ").concat(tempArrHelper[1], "/").concat(tempArrHelper[2]));
                }
                tempArrHelper.splice(0, tempArrHelper.length);
                return [4 /*yield*/, askQuestion("\n   7.) Kod pocztowy [00-000] : ")];
            case 18:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 19:
                _b.sent();
                return [4 /*yield*/, quantityValidator(patientResponseMenu)];
            case 20:
                _b.sent();
                tempArrHelper.push(patientResponseMenu);
                return [4 /*yield*/, askQuestion("\n   8.) Nazwa miejscowości: ")];
            case 21:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 22:
                _b.sent();
                tempArrHelper.push(patientResponseMenu);
                tempArrPatient.push("".concat(tempArrHelper[0], ", ").concat(tempArrHelper[1]));
                tempArrHelper.splice(0, tempArrHelper.length);
                return [4 /*yield*/, askQuestion("\n   9.) Numer telefonu komórkowego [bez spacji] [wpisz: brak jeżeli nie ma] : ")];
            case 23:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 24:
                _b.sent();
                if (patientResponseMenu.toLowerCase().toString() === "brak" ||
                    patientResponseMenu.toLowerCase().toString() === "br" ||
                    patientResponseMenu.toLowerCase().toString() === "b.r" ||
                    patientResponseMenu.toLowerCase().toString() === "b.r.k" ||
                    patientResponseMenu.toLowerCase().toString() === "brk" ||
                    patientResponseMenu.toLowerCase().toString() === "b") {
                    tempArrPatient.push(patientResponseMenu = "brak");
                }
                else {
                    patientResponseMenu.replace(/\s+/g, " ");
                    tempArrPatient.push("+48 ".concat(patientResponseMenu.replace(/(.{3})/g, "$1-").slice(0, -1)));
                }
                return [4 /*yield*/, askQuestion("\n   10.) adres email [wpisz: brak jeżeli nie ma] : ")];
            case 25:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 26:
                _b.sent();
                tempArrPatient.push(patientResponseMenu);
                return [4 /*yield*/, askQuestion("\n   11.) Podaj numer karty pacjenta [wpisz brak jeżeli nie ma] : ")];
            case 27:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 28:
                _b.sent();
                return [4 /*yield*/, quantityValidator(patientResponseMenu)];
            case 29:
                _b.sent();
                tempArrPatient.push(patientResponseMenu);
                newPatient = {
                    id: (0, uuid_1.v4)(),
                    name: tempArrPatient[0],
                    personalID: tempArrPatient[1],
                    gender: tempArrPatient[2],
                    address: tempArrPatient[3],
                    city: tempArrPatient[4],
                    phoneNumber: tempArrPatient[5],
                    email: tempArrPatient[6],
                    cardNumber: tempArrPatient[7],
                    createdAt: (0, moment_1.default)().format('DD-MM-YYYY HH:mm:ss'),
                };
                patients.push(newPatient);
                console.log("");
                console.log("   ".concat(chalk_1.default.blueBright("########################################################")));
                console.log("   ".concat(chalk_1.default.blueBright("########################################################"), "\n"));
                console.log("   Pacjent: ".concat(chalk_1.default.blueBright(newPatient.name), ", zosta\u0142 pomy\u015Blnie dodany do bazy."));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 30:
                _b.sent();
                return [3 /*break*/, 183];
            case 31:
                if (!(selectedOpt === "2")) return [3 /*break*/, 132];
                return [4 /*yield*/, validRole()];
            case 32:
                _b.sent();
                return [4 /*yield*/, askQuestion("\n   Podaj pesel pacjenta: ")];
            case 33:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 34:
                _b.sent();
                return [4 /*yield*/, personalIDValidator(patientResponseMenu)];
            case 35:
                _b.sent();
                givenPatientID_1 = patientResponseMenu;
                foundPatient_1 = null;
                patients.forEach(function (patient) {
                    if (patientResponseMenu === patient.personalID) {
                        return foundPatient_1 = patient;
                    }
                });
                return [4 /*yield*/, askQuestion(editMany)];
            case 36:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 37:
                _b.sent();
                if (!(patientResponseMenu === "0")) return [3 /*break*/, 39];
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 38:
                _b.sent();
                return [3 /*break*/, 131];
            case 39:
                if (!(patientResponseMenu === "1")) return [3 /*break*/, 97];
                return [4 /*yield*/, askQuestion(patientToEditPattern)];
            case 40:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 41:
                _b.sent();
                _a = patientResponseMenu;
                switch (_a) {
                    case "1": return [3 /*break*/, 42];
                    case "2": return [3 /*break*/, 46];
                    case "3": return [3 /*break*/, 52];
                    case "4": return [3 /*break*/, 55];
                    case "5": return [3 /*break*/, 62];
                    case "6": return [3 /*break*/, 69];
                    case "7": return [3 /*break*/, 77];
                    case "8": return [3 /*break*/, 84];
                }
                return [3 /*break*/, 93];
            case 42: return [4 /*yield*/, askQuestion("\n   1.) Wprowadź nowe imię i nazwisko Pacjenta: ")];
            case 43:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 44:
                _b.sent();
                return [4 /*yield*/, quantityValidator(patientResponseMenu)];
            case 45:
                _b.sent();
                foundPatient_1.name = patientResponseMenu;
                return [3 /*break*/, 95];
            case 46: return [4 /*yield*/, askQuestion("\n   2.) Wprowadź nowy numer pesel: ")];
            case 47:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 48:
                _b.sent();
                return [4 /*yield*/, personalIDValidator(patientResponseMenu)];
            case 49:
                _b.sent();
                patients.forEach(function (patient) {
                    if (patient.personalID === patientResponseMenu) {
                        console.log("\n   ".concat(chalk_1.default.redBright("Pacjent o podanym numerze pesel już istnieje w bazie.")));
                        foundPersonalID = true;
                    }
                });
                if (!foundPersonalID) return [3 /*break*/, 51];
                foundPersonalID = false;
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 50:
                _b.sent();
                _b.label = 51;
            case 51:
                foundPatient_1.personalID = patientResponseMenu;
                return [3 /*break*/, 95];
            case 52: return [4 /*yield*/, askQuestion(selectGender)];
            case 53:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 54:
                _b.sent();
                if (patientResponseMenu === "1") {
                    foundPatient_1.gender = "Kobieta";
                }
                else if (patientResponseMenu === "2") {
                    foundPatient_1.gender = "Mężczyzna";
                }
                else if (patientResponseMenu === "3") {
                    foundPatient_1.gender = "Inna";
                }
                else {
                    foundPatient_1.gender = "Inna";
                }
                return [3 /*break*/, 95];
            case 55:
                tempAdr = [];
                return [4 /*yield*/, askQuestion("\n   4.) Wprowadź nową nazwę ulicy [dodaj przedrostek] : ")];
            case 56:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 57:
                _b.sent();
                return [4 /*yield*/, quantityValidator(patientResponseMenu)];
            case 58:
                _b.sent();
                tempAdr.push(patientResponseMenu);
                return [4 /*yield*/, askQuestion("\n   5.) Wprowadź nowy numer: [domu, budynku, bloku] : ")];
            case 59:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 60:
                _b.sent();
                tempAdr.push(patientResponseMenu);
                return [4 /*yield*/, askQuestion("\n   6.) Wprowadź nowy numer lokalu [jeżeli nie dotyczy wciśnij enter] : ")];
            case 61:
                patientResponseMenu = _b.sent();
                tempAdr.push(patientResponseMenu);
                if (tempAdr[2] === undefined || tempAdr[2] === null || tempAdr[2] === "" || tempAdr[2].length === 0) {
                    tempAdr.pop();
                }
                if (tempAdr.length === 2) {
                    foundPatient_1.address = "".concat(tempAdr[0], " ").concat(tempAdr[1]);
                }
                else if (tempAdr.length === 3) {
                    foundPatient_1.address = "".concat(tempAdr[0], " ").concat(tempAdr[1], "/").concat(tempAdr[2]);
                }
                tempAdr.splice(0, tempAdr.length);
                return [3 /*break*/, 95];
            case 62:
                tempAdr1 = [];
                return [4 /*yield*/, askQuestion("\n   7.) Wprowadź nowy kod pocztowy [ 00-000 ] : ")];
            case 63:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 64:
                _b.sent();
                return [4 /*yield*/, quantityValidator(patientResponseMenu)];
            case 65:
                _b.sent();
                tempAdr1.push(patientResponseMenu);
                return [4 /*yield*/, askQuestion("\n   8.) Wprowadź nową nazwę miejscowości: ")];
            case 66:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 67:
                _b.sent();
                return [4 /*yield*/, quantityValidator(patientResponseMenu)];
            case 68:
                _b.sent();
                tempAdr1.push(patientResponseMenu);
                foundPatient_1.city = "".concat(tempAdr1[0], ", ").concat(tempAdr1[1]);
                tempAdr1.splice(0, tempAdr1.length);
                return [3 /*break*/, 95];
            case 69:
                if (!(foundPatient_1.phoneNumber === "brak")) return [3 /*break*/, 72];
                return [4 /*yield*/, askQuestion("\n   9.) Dodaj numer telefonu: ")];
            case 70:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 71:
                _b.sent();
                patientResponseMenu;
                patientResponseMenu.replace(/\s+/g, " ");
                foundPatient_1.phoneNumber = "+48 ".concat(patientResponseMenu.replace(/(.{3})/g, "$1-").slice(0, -1));
                return [3 /*break*/, 76];
            case 72: return [4 /*yield*/, askQuestion("\n   9.) Wprowadź nowy numer telefonu komórkowego: ")];
            case 73:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 74:
                _b.sent();
                patientResponseMenu;
                return [4 /*yield*/, quantityValidator(patientResponseMenu)];
            case 75:
                _b.sent();
                patientResponseMenu.replace(/\s+/g, " ");
                foundPatient_1.phoneNumber = "+48 ".concat(patientResponseMenu.replace(/(.{3})/g, "$1-").slice(0, -1));
                _b.label = 76;
            case 76: return [3 /*break*/, 95];
            case 77:
                if (!(foundPatient_1.email === "brak")) return [3 /*break*/, 80];
                return [4 /*yield*/, askQuestion("\n   10.) Dodaj adres email: ")];
            case 78:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 79:
                _b.sent();
                foundPatient_1.email = String(patientResponseMenu);
                return [3 /*break*/, 83];
            case 80: return [4 /*yield*/, askQuestion("\n   11.) Wprowadź nowy adres email: ")];
            case 81:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 82:
                _b.sent();
                foundPatient_1.email = String(patientResponseMenu);
                _b.label = 83;
            case 83: return [3 /*break*/, 95];
            case 84:
                if (!(foundPatient_1.cardNumber === "brak")) return [3 /*break*/, 88];
                return [4 /*yield*/, askQuestion("\n  12.) Uzupełnij numer karty: ")];
            case 85:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 86:
                _b.sent();
                return [4 /*yield*/, quantityValidator(patientResponseMenu)];
            case 87:
                _b.sent();
                foundPatient_1.cardNumber = String(patientResponseMenu);
                return [3 /*break*/, 92];
            case 88: return [4 /*yield*/, askQuestion("\n  13.) Wprowadź nowy numer karty: ")];
            case 89:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 90:
                _b.sent();
                return [4 /*yield*/, quantityValidator(patientResponseMenu)];
            case 91:
                _b.sent();
                foundPatient_1.cardNumber = String(patientResponseMenu);
                _b.label = 92;
            case 92: return [3 /*break*/, 95];
            case 93:
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 94:
                _b.sent();
                return [3 /*break*/, 95];
            case 95:
                patients.forEach(function (patient) {
                    if (givenPatientID_1 === patient.personalID) {
                        patient.name = foundPatient_1.name;
                        patient.personalID = foundPatient_1.personalID;
                        patient.gender = foundPatient_1.gender;
                        patient.address = foundPatient_1.address;
                        patient.city = foundPatient_1.city;
                        patient.phoneNumber = foundPatient_1.phoneNumber;
                        patient.email = foundPatient_1.email;
                        patient.cardNumber = foundPatient_1.cardNumber;
                    }
                });
                console.log("");
                console.log("   ".concat(chalk_1.default.blueBright("########################################################")));
                console.log("   ".concat(chalk_1.default.blueBright("########################################################"), "\n"));
                console.log("   Dane Pacjenta o numerze pesel: ".concat(chalk_1.default.blueBright(foundPatient_1.personalID), ", zosta\u0142y pomy\u015Blnie zaktualizowane."));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 96:
                _b.sent();
                return [3 /*break*/, 131];
            case 97:
                if (!(patientResponseMenu === "2")) return [3 /*break*/, 129];
                tempArrPatientEdit_1 = [];
                tempArrHelperEdit = [];
                return [4 /*yield*/, askQuestion("\n   1.) Podaj imię i nazwisko pacjenta: ")];
            case 98:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 99:
                _b.sent();
                return [4 /*yield*/, quantityValidator(patientResponseMenu)];
            case 100:
                _b.sent();
                tempArrPatientEdit_1.push(patientResponseMenu);
                return [4 /*yield*/, askQuestion("\n   2.) Pesel: ")];
            case 101:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 102:
                _b.sent();
                return [4 /*yield*/, personalIDValidator(patientResponseMenu)];
            case 103:
                _b.sent();
                patients.forEach(function (patient) {
                    if (patient.personalID === patientResponseMenu) {
                        console.log("\n   ".concat(chalk_1.default.redBright("Pacjent o podanym numerze pesel już istnieje w bazie.")));
                        foundPersonalID = true;
                    }
                });
                if (!foundPersonalID) return [3 /*break*/, 105];
                foundPersonalID = false;
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 104:
                _b.sent();
                _b.label = 105;
            case 105:
                tempArrPatientEdit_1.push(patientResponseMenu);
                return [4 /*yield*/, askQuestion(selectGender)];
            case 106:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 107:
                _b.sent();
                if (patientResponseMenu === "1") {
                    tempArrPatientEdit_1.push("Kobieta");
                }
                else if (patientResponseMenu === "2") {
                    tempArrPatientEdit_1.push("Mężczyzna");
                }
                else if (patientResponseMenu === "2") {
                    tempArrPatientEdit_1.push("Inna");
                }
                else {
                    tempArrPatientEdit_1.push("Inna");
                }
                return [4 /*yield*/, askQuestion("\n   4.) Pełna nazwa ulicy [dodaj przedrostek] : ")];
            case 108:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 109:
                _b.sent();
                return [4 /*yield*/, quantityValidator(patientResponseMenu)];
            case 110:
                _b.sent();
                tempArrHelperEdit.push(patientResponseMenu);
                return [4 /*yield*/, askQuestion("\n   5.) Numer [domu, budynku, bloku] : ")];
            case 111:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 112:
                _b.sent();
                tempArrHelperEdit.push(patientResponseMenu);
                return [4 /*yield*/, askQuestion("\n   6.) Numer lokalu [jeżeli nie dotyczy wciśnij enter] : ")];
            case 113:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 114:
                _b.sent();
                tempArrHelperEdit.push(patientResponseMenu);
                if (tempArrHelperEdit[2] === undefined || tempArrHelperEdit[2] === null || tempArrHelperEdit[2] === "" || tempArrHelperEdit[2].length === 0) {
                    tempArrHelperEdit.pop();
                }
                if (tempArrHelperEdit.length === 2) {
                    tempArrPatientEdit_1.push("".concat(tempArrHelperEdit[0], " ").concat(tempArrHelperEdit[1]));
                }
                else if (tempArrHelperEdit.length === 3) {
                    tempArrPatientEdit_1.push("".concat(tempArrHelperEdit[0], " ").concat(tempArrHelperEdit[1], "/").concat(tempArrHelperEdit[2]));
                }
                tempArrHelperEdit.splice(0, tempArrHelperEdit.length);
                return [4 /*yield*/, askQuestion("\n   7.) Kod pocztowy [00-000] : ")];
            case 115:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 116:
                _b.sent();
                return [4 /*yield*/, quantityValidator(patientResponseMenu)];
            case 117:
                _b.sent();
                tempArrHelperEdit.push(patientResponseMenu);
                return [4 /*yield*/, askQuestion("\n   8.) Nazwa miejscowości: ")];
            case 118:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 119:
                _b.sent();
                return [4 /*yield*/, quantityValidator(patientResponseMenu)];
            case 120:
                _b.sent();
                tempArrHelperEdit.push(patientResponseMenu);
                tempArrPatientEdit_1.push("".concat(tempArrHelperEdit[0], ", ").concat(tempArrHelperEdit[1]));
                tempArrHelperEdit.splice(0, tempArrHelperEdit.length);
                return [4 /*yield*/, askQuestion("\n   9.) Numer telefonu [bez spacji] [wpisz: brak jeżeli nie ma] : ")];
            case 121:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 122:
                _b.sent();
                patientResponseMenu;
                return [4 /*yield*/, quantityValidator(patientResponseMenu)];
            case 123:
                _b.sent();
                patientResponseMenu.replace(/\s+/g, " ");
                tempArrPatientEdit_1.push("+48 ".concat(patientResponseMenu.replace(/(.{3})/g, "$1-").slice(0, -1)));
                return [4 /*yield*/, askQuestion("\n   10.) adres email [wpisz: brak jeżeli niema] : ")];
            case 124:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 125:
                _b.sent();
                tempArrPatientEdit_1.push(patientResponseMenu);
                return [4 /*yield*/, askQuestion("\n   11.) Podaj numer karty pacjenta [wpisz brak jeżeli nie ma] : ")];
            case 126:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 127:
                _b.sent();
                if (patientResponseMenu.toLowerCase().toString() === "brak" ||
                    patientResponseMenu.toLowerCase().toString() === "br" ||
                    patientResponseMenu.toLowerCase().toString() === "b.r" ||
                    patientResponseMenu.toLowerCase().toString() === "b.r.k" ||
                    patientResponseMenu.toLowerCase().toString() === "brk" ||
                    patientResponseMenu.toLowerCase().toString() === "b") {
                    patientResponseMenu = "brak";
                }
                tempArrPatientEdit_1.push(patientResponseMenu);
                patients.forEach(function (patient) {
                    if (givenPatientID_1 === patient.personalID) {
                        patient.name = tempArrPatientEdit_1[0];
                        patient.personalID = tempArrPatientEdit_1[1];
                        patient.gender = tempArrPatientEdit_1[2];
                        patient.address = tempArrPatientEdit_1[3];
                        patient.city = tempArrPatientEdit_1[4];
                        patient.phoneNumber = tempArrPatientEdit_1[5];
                        patient.email = tempArrPatientEdit_1[6];
                        patient.cardNumber = tempArrPatientEdit_1[7];
                    }
                });
                tempArrPatientEdit_1.splice(0, tempArrPatientEdit_1.length);
                console.log("");
                console.log("   ".concat(chalk_1.default.blueBright("########################################################")));
                console.log("   ".concat(chalk_1.default.blueBright("########################################################"), "\n"));
                console.log("   Dane Pacjenta o numerze pesel: ".concat(chalk_1.default.blueBright(foundPatient_1.personalID), ", zosta\u0142y pomy\u015Blnie zaktualizowane."));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 128:
                _b.sent();
                return [3 /*break*/, 131];
            case 129:
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 130:
                _b.sent();
                _b.label = 131;
            case 131: return [3 /*break*/, 183];
            case 132:
                if (!(selectedOpt === "3")) return [3 /*break*/, 139];
                if (!(clinics.length === 0)) return [3 /*break*/, 134];
                console.log("");
                console.log("   ".concat(chalk_1.default.yellowBright("Aktualnie w bazie danych, niema zapisanych obiektów medycznych. Dodaj obiekt aby wykonać tą operację.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 133:
                _b.sent();
                _b.label = 134;
            case 134: return [4 /*yield*/, askQuestion("\n   Podaj pesel pacjenta: ")];
            case 135:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 136:
                _b.sent();
                return [4 /*yield*/, personalIDValidator(patientResponseMenu)];
            case 137:
                _b.sent();
                clinics === null || clinics === void 0 ? void 0 : clinics.forEach(function (clinic) {
                    var propertyPatients = clinic.patients;
                    if (propertyPatients.length > 0) {
                        propertyPatients.forEach(function (patient) {
                            if (patient.personalID === patientResponseMenu) {
                                console.log("");
                                console.log("   ".concat(chalk_1.default.blackBright("dbID: "), " ").concat(chalk_1.default.yellowBright(clinic.id), ","));
                                console.log("   ".concat(chalk_1.default.blackBright("Nazwa placówki: "), " ").concat(chalk_1.default.greenBright(clinic.name), ","));
                                console.log("   ".concat(chalk_1.default.blackBright("Adres: "), " ").concat(chalk_1.default.greenBright(clinic.address), ","));
                                console.log("   ".concat(chalk_1.default.blackBright("Kod pocztowy i miasto: "), " ").concat(chalk_1.default.greenBright(clinic.city), ","));
                                console.log("   ".concat(chalk_1.default.blackBright("Typ placówki: "), " ").concat(chalk_1.default.greenBright(clinic.type), ","));
                                console.log("");
                            }
                        });
                    }
                });
                console.log("");
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 138:
                _b.sent();
                return [3 /*break*/, 183];
            case 139:
                if (!(selectedOpt === "4")) return [3 /*break*/, 145];
                return [4 /*yield*/, validRole()];
            case 140:
                _b.sent();
                return [4 /*yield*/, askQuestion("\n   Podaj pesel pacjenta: ")];
            case 141:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 142:
                _b.sent();
                return [4 /*yield*/, personalIDValidator(patientResponseMenu)];
            case 143:
                _b.sent();
                patients.forEach(function (patient) {
                    if (patientResponseMenu === patient.personalID) {
                        console.log("");
                        console.log("   ".concat(chalk_1.default.blackBright("dbID: "), " ").concat(chalk_1.default.yellowBright(patient.id), ","));
                        console.log("   ".concat(chalk_1.default.blackBright("Imię i nazwisko: "), " ").concat(chalk_1.default.greenBright(patient.name), ","));
                        console.log("   ".concat(chalk_1.default.blackBright("Pesel: "), " ").concat(chalk_1.default.greenBright(patient.personalID), ","));
                        console.log("   ".concat(chalk_1.default.blackBright("Płeć: "), " ").concat(chalk_1.default.greenBright(patient.gender), ","));
                        console.log("   ".concat(chalk_1.default.blackBright("Adres: "), " ").concat(chalk_1.default.greenBright(patient.address), ","));
                        console.log("   ".concat(chalk_1.default.blackBright("Kod pocztowy i miasto: "), " ").concat(chalk_1.default.greenBright(patient.city), ","));
                        console.log("   ".concat(chalk_1.default.blackBright("Numer telefonu: "), " ").concat(chalk_1.default.greenBright(patient.phoneNumber), ","));
                        console.log("   ".concat(chalk_1.default.blackBright("Adres email: "), " ").concat(chalk_1.default.greenBright(patient.email), ","));
                        console.log("   ".concat(chalk_1.default.blackBright("Numer karty pacjenta: "), " ").concat(chalk_1.default.greenBright(patient.cardNumber), ","));
                        console.log("   ".concat(chalk_1.default.blackBright("Data utworzenia konta: "), " ").concat(chalk_1.default.greenBright(patient.createdAt), ","));
                    }
                });
                console.log("");
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 144:
                _b.sent();
                return [3 /*break*/, 183];
            case 145:
                if (!(selectedOpt === "5")) return [3 /*break*/, 148];
                return [4 /*yield*/, validRole()];
            case 146:
                _b.sent();
                patients.forEach(function (patient) {
                    console.log("");
                    console.log("   ".concat(chalk_1.default.blackBright("dbID: "), " ").concat(chalk_1.default.yellowBright(patient.id), ","));
                    console.log("   ".concat(chalk_1.default.blackBright("Imię i nazwisko: "), " ").concat(chalk_1.default.greenBright(patient.name), ","));
                    console.log("   ".concat(chalk_1.default.blackBright("Pesel: "), " ").concat(chalk_1.default.greenBright(patient.personalID), ","));
                    console.log("   ".concat(chalk_1.default.blackBright("Płeć: "), " ").concat(chalk_1.default.greenBright(patient.gender), ","));
                    console.log("   ".concat(chalk_1.default.blackBright("Adres: "), " ").concat(chalk_1.default.greenBright(patient.address), ","));
                    console.log("   ".concat(chalk_1.default.blackBright("Kod pocztowy i miasto: "), " ").concat(chalk_1.default.greenBright(patient.city), ","));
                    console.log("   ".concat(chalk_1.default.blackBright("Numer telefonu: "), " ").concat(chalk_1.default.greenBright(patient.phoneNumber), ","));
                    console.log("   ".concat(chalk_1.default.blackBright("Adres email: "), " ").concat(chalk_1.default.greenBright(patient.email), ","));
                    console.log("   ".concat(chalk_1.default.blackBright("Numer karty pacjenta: "), " ").concat(chalk_1.default.greenBright(patient.cardNumber), ","));
                    console.log("   ".concat(chalk_1.default.blackBright("Data utworzenia konta: "), " ").concat(chalk_1.default.greenBright(patient.createdAt), ","));
                    console.log("\n   ".concat(chalk_1.default.bold.magentaBright("##############################"), "\n"));
                });
                console.log("");
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 147:
                _b.sent();
                return [3 /*break*/, 183];
            case 148:
                if (!(selectedOpt === "6")) return [3 /*break*/, 157];
                return [4 /*yield*/, validRole()];
            case 149:
                _b.sent();
                tempArrTransfer_1 = [];
                return [4 /*yield*/, askQuestion("\n   Podaj pesel pacjenta: ")];
            case 150:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 151:
                _b.sent();
                return [4 /*yield*/, personalIDValidator(patientResponseMenu)];
            case 152:
                _b.sent();
                tempArrTransfer_1.push(patientResponseMenu);
                return [4 /*yield*/, askQuestion("\n   Podaj nazwę placówki: ")];
            case 153:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 154:
                _b.sent();
                return [4 /*yield*/, quantityValidator(patientResponseMenu)];
            case 155:
                _b.sent();
                tempArrTransfer_1.push(patientResponseMenu);
                clinics.forEach(function (clinic) {
                    if (clinic.name === tempArrTransfer_1[1]) {
                        patients.forEach(function (patient) {
                            if (patient.personalID === tempArrTransfer_1[0]) {
                                clinic.patients.push(patient);
                            }
                        });
                    }
                });
                console.log("");
                console.log("   Pacjent o numerze pesel: ".concat(chalk_1.default.blueBright(tempArrTransfer_1[0]), ", zosta\u0142 pomy\u015Blnie dodany do ").concat(chalk_1.default.blueBright(tempArrTransfer_1[1]), "."));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 156:
                _b.sent();
                return [3 /*break*/, 183];
            case 157:
                if (!(selectedOpt === "7")) return [3 /*break*/, 168];
                return [4 /*yield*/, validRole()];
            case 158:
                _b.sent();
                tempArrPatient_1 = [];
                patientToTransfer_1 = null;
                lastClinic_1 = "";
                if (!(clinics.length === 0)) return [3 /*break*/, 160];
                console.log("");
                console.log("   ".concat(chalk_1.default.yellowBright("Aktualnie w bazie danych, niema zapisanych obiektów medycznych. Dodaj obiekt aby wykonać tą operację.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 159:
                _b.sent();
                _b.label = 160;
            case 160: return [4 /*yield*/, askQuestion("\n   Podaj pesel pacjenta: ")];
            case 161:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 162:
                _b.sent();
                return [4 /*yield*/, personalIDValidator(patientResponseMenu)];
            case 163:
                _b.sent();
                tempArrPatient_1.push(patientResponseMenu);
                return [4 /*yield*/, askQuestion("\n   Podaj nazwę placówki do której chcesz przenieść pacjenta: ")];
            case 164:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 165:
                _b.sent();
                return [4 /*yield*/, quantityValidator(patientResponseMenu)];
            case 166:
                _b.sent();
                clinics === null || clinics === void 0 ? void 0 : clinics.forEach(function (clinic) {
                    var propertyPatients = clinic.patients;
                    if (propertyPatients && propertyPatients.length > 0) {
                        propertyPatients.forEach(function (patient, index) {
                            if (patient.personalID === tempArrPatient_1[0]) {
                                lastClinic_1 = clinic.name;
                                patientToTransfer_1 = patient;
                                propertyPatients.splice(index, 1);
                            }
                        });
                    }
                });
                clinics === null || clinics === void 0 ? void 0 : clinics.forEach(function (clinic) {
                    var _a;
                    if (patientResponseMenu === clinic.name) {
                        (_a = clinic.patients) === null || _a === void 0 ? void 0 : _a.push(patientToTransfer_1);
                    }
                });
                console.log("");
                console.log("   Pacjent: ".concat(chalk_1.default.blueBright(patientToTransfer_1.name), ", zosta\u0142 przeniesiony pomy\u015Blnie do: ").concat(chalk_1.default.blueBright(patientResponseMenu), "\n"));
                console.log("   Dane pacjenta z obiektu: ".concat(chalk_1.default.blueBright(lastClinic_1), " zosta\u0142y pomy\u015Blnie usuni\u0119te."));
                patientToTransfer_1 = null;
                tempArrPatient_1.slice(0, tempArrPatient_1.length);
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 167:
                _b.sent();
                return [3 /*break*/, 183];
            case 168:
                if (!(selectedOpt === "8")) return [3 /*break*/, 179];
                return [4 /*yield*/, validRole()];
            case 169:
                _b.sent();
                patientToRemove_1 = "";
                patientID_1 = "";
                return [4 /*yield*/, askQuestion("\n   Podaj pesel pacjenta: ")];
            case 170:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 171:
                _b.sent();
                return [4 /*yield*/, personalIDValidator(patientResponseMenu)];
            case 172:
                _b.sent();
                patients.filter(function (item) {
                    if (patientResponseMenu === item.personalID) {
                        patientID_1 = item.id;
                        patientToRemove_1 = item.address;
                        return;
                    }
                });
                return [4 /*yield*/, askQuestion(chalk_1.default.redBright("\n   Przepisz adres pacjenta w celu usuni\u0119cia go z bazy\n   [ ".concat(chalk_1.default.cyanBright("".concat(patientToRemove_1)), " ]: ")))];
            case 173:
                patientResponseMenu = _b.sent();
                return [4 /*yield*/, validValue(patientResponseMenu)];
            case 174:
                _b.sent();
                if (!(patientResponseMenu === patientToRemove_1)) return [3 /*break*/, 176];
                index = patients.findIndex(function (item) { return item.id === patientID_1; });
                if (index !== -1) {
                    patients.splice(index, 1);
                }
                console.log("");
                console.log("   ".concat(chalk_1.default.bold.bgRed("Pacjent został pomyślnie usunięty.\n")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 175:
                _b.sent();
                return [3 /*break*/, 178];
            case 176:
                if (!(patientResponseMenu !== patientToRemove_1)) return [3 /*break*/, 178];
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Podana wartość jest nie prawidłowa. Pacjent nie został usunięty.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 177:
                _b.sent();
                _b.label = 178;
            case 178: return [3 /*break*/, 183];
            case 179:
                if (!(selectedOpt === "0")) return [3 /*break*/, 181];
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 180: return [2 /*return*/, _b.sent()];
            case 181:
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 182:
                _b.sent();
                _b.label = 183;
            case 183: return [2 /*return*/];
        }
    });
}); };
var handleClinicMenu = function (selectedOpt) { return __awaiter(void 0, void 0, void 0, function () {
    var clinicResponseMenu, tempArrClinic, tempAdr1, newClinic, peselString, peselsArray, peselsFound_1, _i, _a, pesel, clearNumbersArr, newPersonalIDArray, notFoundNumbers, propertyName, tempArrClinic1_1, tempAdr22_1, _b, _c, clinicToRemove_1, clinicID_1, index;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                clinicResponseMenu = "";
                tempArrClinic = [];
                tempAdr1 = [];
                if (!(selectedOpt === "1")) return [3 /*break*/, 47];
                return [4 /*yield*/, validRole()];
            case 1:
                _d.sent();
                return [4 /*yield*/, askQuestion("\n   1.) Podaj nazwę placówki: ")];
            case 2:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 3:
                _d.sent();
                return [4 /*yield*/, quantityValidator(clinicResponseMenu)];
            case 4:
                _d.sent();
                tempArrClinic.push(clinicResponseMenu);
                return [4 /*yield*/, askQuestion("\n   2.) Wprowadź nazwę ulicy bez numeru [dodaj przedrostek] : ")];
            case 5:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 6:
                _d.sent();
                return [4 /*yield*/, quantityValidator(clinicResponseMenu)];
            case 7:
                _d.sent();
                tempAdr1.push(clinicResponseMenu);
                return [4 /*yield*/, askQuestion("\n   3.) Wprowadź numer: [domu, budynku, bloku] : ")];
            case 8:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 9:
                _d.sent();
                tempAdr1.push(clinicResponseMenu);
                return [4 /*yield*/, askQuestion("\n   4.) Wprowadź numer lokalu [jeżeli nie dotyczy wciśnij enter] : ")];
            case 10:
                clinicResponseMenu = _d.sent();
                tempAdr1.push(clinicResponseMenu);
                if (tempAdr1[2] === undefined || tempAdr1[2] === null || tempAdr1[2] === "" || tempAdr1[2].length === 0) {
                    tempAdr1.pop();
                }
                if (tempAdr1.length === 2) {
                    tempArrClinic.push("".concat(tempAdr1[0], " ").concat(tempAdr1[1]));
                }
                else if (tempAdr1.length === 3) {
                    tempArrClinic.push("".concat(tempAdr1[0], " ").concat(tempAdr1[1], "/").concat(tempAdr1[2]));
                }
                tempAdr1.splice(0, tempAdr1.length);
                return [4 /*yield*/, askQuestion("\n   5.) Wprowadź kod pocztowy [00-000] : ")];
            case 11:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 12:
                _d.sent();
                return [4 /*yield*/, quantityValidator(clinicResponseMenu)];
            case 13:
                _d.sent();
                tempAdr1.push(clinicResponseMenu);
                return [4 /*yield*/, askQuestion("\n   6.) Wprowadź nazwę miejscowości: ")];
            case 14:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 15:
                _d.sent();
                return [4 /*yield*/, quantityValidator(clinicResponseMenu)];
            case 16:
                _d.sent();
                tempAdr1.push(clinicResponseMenu);
                tempArrClinic.push("".concat(tempAdr1[0], ", ").concat(tempAdr1[1]));
                tempAdr1.splice(0, tempAdr1.length);
                return [4 /*yield*/, askQuestion(clinicMenuType)];
            case 17:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 18:
                _d.sent();
                if (!(clinicResponseMenu === "1")) return [3 /*break*/, 19];
                tempArrClinic.push(clinicType[0]);
                return [3 /*break*/, 23];
            case 19:
                if (!(clinicResponseMenu === "2")) return [3 /*break*/, 20];
                tempArrClinic.push(clinicType[1]);
                return [3 /*break*/, 23];
            case 20:
                if (!(clinicResponseMenu === "3")) return [3 /*break*/, 21];
                tempArrClinic.push(clinicType[2]);
                return [3 /*break*/, 23];
            case 21:
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 22:
                _d.sent();
                _d.label = 23;
            case 23:
                tempAdr1.splice(0, tempAdr1.length);
                newClinic = {
                    id: (0, uuid_1.v4)(),
                    name: tempArrClinic[0],
                    address: tempArrClinic[1],
                    city: tempArrClinic[2],
                    type: tempArrClinic[3],
                    patients: [],
                };
                clinics.push(newClinic);
                return [4 /*yield*/, askQuestion(addPatientToClinicMenu)];
            case 24:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 25:
                _d.sent();
                if (!(clinicResponseMenu === "1")) return [3 /*break*/, 27];
                console.log("");
                console.log("   ".concat(chalk_1.default.blueBright("########################################################")));
                console.log("   ".concat(chalk_1.default.blueBright("########################################################"), "\n"));
                console.log("   Obiekt o nazwie: ".concat(chalk_1.default.blueBright(tempArrClinic[0]), ", zosta\u0142 pomy\u015Blnie dodany do bazy."));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 26:
                _d.sent();
                return [3 /*break*/, 46];
            case 27:
                if (!(clinicResponseMenu === "2")) return [3 /*break*/, 34];
                if (!(clinics.length === 0)) return [3 /*break*/, 29];
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("W bazie danych nie ma aktualnie żadnej kliniki. Dodaj klinikę aby skorzystać z tej opcji")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 28:
                _d.sent();
                _d.label = 29;
            case 29: return [4 /*yield*/, askQuestion("\n   Wprowadź numery pesel oddzielając je przecinkiem [ 12345678,12345678,12345678... ]: ")];
            case 30:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 31:
                _d.sent();
                return [4 /*yield*/, personalIDValidator(clinicResponseMenu)];
            case 32:
                _d.sent();
                peselString = clinicResponseMenu;
                peselsArray = [];
                peselsFound_1 = [];
                for (_i = 0, _a = peselString.split(','); _i < _a.length; _i++) {
                    pesel = _a[_i];
                    peselsArray.push(pesel);
                }
                console.log();
                clearNumbersArr = new Set(peselsArray);
                newPersonalIDArray = Array.from(clearNumbersArr);
                newPersonalIDArray.forEach(function (pesel) {
                    patients.forEach(function (patient) {
                        if (patient.personalID === pesel) {
                            clinics.forEach(function (clinic) {
                                if (clinic.name === tempArrClinic[0]) {
                                    peselsFound_1.push(pesel);
                                    clinic.patients.push(patient);
                                }
                            });
                        }
                    });
                });
                notFoundNumbers = newPersonalIDArray.filter(function (item) { return !peselsFound_1.includes(item); });
                if (notFoundNumbers.length !== 0) {
                    console.log("\n   ".concat(chalk_1.default.bold.magentaBright("#########################\n")));
                    console.log("   Lista nieznalezionych numer\u00F3w pesel:\n");
                    notFoundNumbers.forEach(function (item) {
                        console.log("   ".concat(item, ","));
                    });
                    console.log("\n   ".concat(chalk_1.default.bold.magentaBright("#########################\n")));
                }
                console.log("");
                console.log("   Obiekt o nazwie: ".concat(chalk_1.default.blueBright(tempArrClinic[0]), ", wraz z pacjentami, zosta\u0142 pomy\u015Blnie dodany do bazy."));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 33:
                _d.sent();
                return [3 /*break*/, 46];
            case 34:
                if (!(clinicResponseMenu === "3")) return [3 /*break*/, 44];
                if (!(clinics.length === 0)) return [3 /*break*/, 36];
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("W bazie danych nie ma aktualnie żadnej kliniki. Dodaj klinikę aby skorzystać z tej opcji")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 35:
                _d.sent();
                _d.label = 36;
            case 36: return [4 /*yield*/, askQuestion("\n   Wprowadź nazwę placówki: ")];
            case 37:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 38:
                _d.sent();
                return [4 /*yield*/, quantityValidator(clinicResponseMenu)];
            case 39:
                _d.sent();
                tempAdr1.push(clinicResponseMenu);
                return [4 /*yield*/, askQuestion("\n   Wprowadź pesel pacjenta: ")];
            case 40:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 41:
                _d.sent();
                return [4 /*yield*/, personalIDValidator(clinicResponseMenu)];
            case 42:
                _d.sent();
                tempAdr1.push(clinicResponseMenu);
                clinics === null || clinics === void 0 ? void 0 : clinics.forEach(function (clinic) {
                    if (clinic.name === tempAdr1[0]) {
                        patients.forEach(function (patient) {
                            var _a;
                            if (patient.personalID === tempAdr1[1]) {
                                (_a = clinic.patients) === null || _a === void 0 ? void 0 : _a.push(patient);
                            }
                        });
                    }
                });
                console.log("");
                console.log("   ".concat(chalk_1.default.blueBright("########################################################")));
                console.log("   ".concat(chalk_1.default.blueBright("########################################################"), "\n"));
                console.log("   Obiekt o nazwie: ".concat(chalk_1.default.blueBright(tempArrClinic[0]), ", wraz z pacjentem, zosta\u0142 pomy\u015Blnie dodany do bazy."));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 43:
                _d.sent();
                return [3 /*break*/, 46];
            case 44:
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 45:
                _d.sent();
                _d.label = 46;
            case 46: return [3 /*break*/, 147];
            case 47:
                if (!(selectedOpt === "2")) return [3 /*break*/, 116];
                return [4 /*yield*/, validRole()];
            case 48:
                _d.sent();
                propertyName = "";
                tempArrClinic1_1 = [];
                tempAdr22_1 = [];
                return [4 /*yield*/, askQuestion("\n   Wprowadź nazwę placówki: ")];
            case 49:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 50:
                _d.sent();
                return [4 /*yield*/, quantityValidator(clinicResponseMenu)];
            case 51:
                _d.sent();
                tempArrClinic1_1.push(clinicResponseMenu);
                return [4 /*yield*/, askQuestion(editMany)];
            case 52:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 53:
                _d.sent();
                if (!(clinicResponseMenu === "1")) return [3 /*break*/, 88];
                return [4 /*yield*/, askQuestion(editMenuClinic)];
            case 54:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 55:
                _d.sent();
                _b = clinicResponseMenu;
                switch (_b) {
                    case "1": return [3 /*break*/, 56];
                    case "2": return [3 /*break*/, 60];
                    case "3": return [3 /*break*/, 68];
                    case "4": return [3 /*break*/, 75];
                }
                return [3 /*break*/, 84];
            case 56:
                propertyName = "Nazwa placówki";
                return [4 /*yield*/, askQuestion("\n   Wprowadź nową nazwę placówki: ")];
            case 57:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 58:
                _d.sent();
                return [4 /*yield*/, quantityValidator(clinicResponseMenu)];
            case 59:
                _d.sent();
                clinics.forEach(function (clinic) {
                    if (clinic.name === tempArrClinic1_1[0]) {
                        clinic.name = clinicResponseMenu;
                        return;
                    }
                });
                return [3 /*break*/, 86];
            case 60:
                propertyName = "Adres";
                return [4 /*yield*/, askQuestion("\n   Wprowadź nazwę ulicy bez numeru [dodaj przedrostek] : ")];
            case 61:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 62:
                _d.sent();
                return [4 /*yield*/, quantityValidator(clinicResponseMenu)];
            case 63:
                _d.sent();
                tempAdr22_1.push(clinicResponseMenu);
                return [4 /*yield*/, askQuestion("\n   Wprowadź numer: [domu, budynku, bloku] : ")];
            case 64:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 65:
                _d.sent();
                tempAdr22_1.push(clinicResponseMenu);
                return [4 /*yield*/, askQuestion("\n   Wprowadź numer lokalu [jeżeli nie dotyczy wciśnij enter] : ")];
            case 66:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 67:
                _d.sent();
                tempAdr22_1.push(clinicResponseMenu);
                if (tempAdr22_1[2] === undefined || tempAdr22_1[2] === null || tempAdr22_1[2] === "" || tempAdr22_1[2].length === 0) {
                    tempAdr22_1.pop();
                }
                if (tempAdr22_1.length === 2) {
                    clinics.forEach(function (clinic) {
                        if (clinic.name === tempArrClinic1_1[0]) {
                            clinic.address = "".concat(tempAdr22_1[0], " ").concat(tempAdr22_1[1]);
                            return;
                        }
                    });
                }
                else if (tempAdr1.length === 3) {
                    clinics.forEach(function (clinic) {
                        if (clinic.name === tempArrClinic1_1[0]) {
                            clinic.address = "".concat(tempAdr22_1[0], " ").concat(tempAdr22_1[1], "/").concat(tempAdr22_1[2]);
                            return;
                        }
                    });
                }
                return [3 /*break*/, 86];
            case 68:
                propertyName = "Kod pocztowy i miasto";
                return [4 /*yield*/, askQuestion("\n   Wprowadź kod pocztowy [00-000] : ")];
            case 69:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 70:
                _d.sent();
                return [4 /*yield*/, quantityValidator(clinicResponseMenu)];
            case 71:
                _d.sent();
                tempAdr22_1.push(clinicResponseMenu);
                return [4 /*yield*/, askQuestion("\n   Wprowadź nazwę miejscowości: ")];
            case 72:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 73:
                _d.sent();
                return [4 /*yield*/, quantityValidator(clinicResponseMenu)];
            case 74:
                _d.sent();
                tempAdr22_1.push(clinicResponseMenu);
                clinics.forEach(function (clinic) {
                    if (clinic.name === tempArrClinic1_1[0]) {
                        clinic.city = "".concat(tempAdr22_1[0], ", ").concat(tempAdr22_1[1]);
                        return;
                    }
                });
                return [3 /*break*/, 86];
            case 75:
                propertyName = "Typ placówki";
                return [4 /*yield*/, askQuestion(clinicMenuType)];
            case 76:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 77:
                _d.sent();
                _c = clinicResponseMenu;
                switch (_c) {
                    case "1": return [3 /*break*/, 78];
                    case "2": return [3 /*break*/, 79];
                    case "3": return [3 /*break*/, 80];
                }
                return [3 /*break*/, 81];
            case 78:
                clinics.forEach(function (clinic) {
                    if (clinic.name === tempArrClinic1_1[0]) {
                        clinic.type = clinicType[0];
                        return;
                    }
                });
                return [3 /*break*/, 83];
            case 79:
                clinics.forEach(function (clinic) {
                    if (clinic.name === tempArrClinic1_1[0]) {
                        clinic.type = clinicType[1];
                        return;
                    }
                });
                return [3 /*break*/, 83];
            case 80:
                clinics.forEach(function (clinic) {
                    if (clinic.name === tempArrClinic1_1[0]) {
                        clinic.type = clinicType[2];
                        return;
                    }
                });
                return [3 /*break*/, 83];
            case 81:
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 82:
                _d.sent();
                return [3 /*break*/, 83];
            case 83: return [3 /*break*/, 86];
            case 84:
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 85:
                _d.sent();
                return [3 /*break*/, 86];
            case 86:
                console.log("");
                console.log("   Warto\u015B\u0107 pola ".concat(chalk_1.default.blueBright(propertyName), " obiektu o nazwie: ").concat(chalk_1.default.blueBright(tempArrClinic1_1[0]), ",  zosta\u0142a pomy\u015Blnie zaktualizowana."));
                tempAdr1.splice(0, tempAdr1.length);
                tempArrClinic1_1.splice(0, tempArrClinic1_1.length);
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 87:
                _d.sent();
                return [3 /*break*/, 115];
            case 88:
                if (!(clinicResponseMenu === "2")) return [3 /*break*/, 113];
                return [4 /*yield*/, askQuestion("\n   Podaj nową nazwę placówki: ")];
            case 89:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 90:
                _d.sent();
                return [4 /*yield*/, quantityValidator(clinicResponseMenu)];
            case 91:
                _d.sent();
                tempArrClinic1_1.push(clinicResponseMenu);
                return [4 /*yield*/, askQuestion("\n   Wprowadź nową nazwę ulicy bez numeru [dodaj przedrostek] : ")];
            case 92:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 93:
                _d.sent();
                return [4 /*yield*/, quantityValidator(clinicResponseMenu)];
            case 94:
                _d.sent();
                tempAdr22_1.push(clinicResponseMenu);
                return [4 /*yield*/, askQuestion("\n   Wprowadź nowy numer: [domu, budynku, bloku] : ")];
            case 95:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 96:
                _d.sent();
                tempAdr22_1.push(clinicResponseMenu);
                return [4 /*yield*/, askQuestion("\n   Wprowadź nowy numer lokalu [jeżeli nie dotyczy wciśnij enter] : ")];
            case 97:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 98:
                _d.sent();
                tempAdr22_1.push(clinicResponseMenu);
                if (tempAdr22_1[2] === undefined || tempAdr22_1[2] === null || tempAdr22_1[2] === "" || tempAdr22_1[2].length === 0) {
                    tempAdr22_1.pop();
                }
                if (tempAdr22_1.length === 2) {
                    tempArrClinic1_1.push("".concat(tempAdr22_1[0], " ").concat(tempAdr22_1[1]));
                }
                else if (tempAdr22_1.length === 3) {
                    tempArrClinic1_1.push("".concat(tempAdr22_1[0], " ").concat(tempAdr22_1[1], "/").concat(tempAdr22_1[2]));
                }
                tempAdr22_1.splice(0, tempAdr22_1.length);
                return [4 /*yield*/, askQuestion("\n   Wprowadź nowy kod pocztowy [00-000] : ")];
            case 99:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 100:
                _d.sent();
                return [4 /*yield*/, quantityValidator(clinicResponseMenu)];
            case 101:
                _d.sent();
                tempAdr22_1.push(clinicResponseMenu);
                return [4 /*yield*/, askQuestion("\n   Wprowadź nową nazwę miejscowości: ")];
            case 102:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 103:
                _d.sent();
                return [4 /*yield*/, quantityValidator(clinicResponseMenu)];
            case 104:
                _d.sent();
                tempAdr22_1.push(clinicResponseMenu);
                tempArrClinic1_1.push("".concat(tempAdr22_1[0], ", ").concat(tempAdr22_1[1]));
                tempAdr22_1.splice(0, tempAdr22_1.length);
                return [4 /*yield*/, askQuestion(clinicMenuType)];
            case 105:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 106:
                _d.sent();
                if (!(clinicResponseMenu === "1")) return [3 /*break*/, 107];
                tempArrClinic1_1.push(clinicType[0]);
                return [3 /*break*/, 111];
            case 107:
                if (!(clinicResponseMenu === "2")) return [3 /*break*/, 108];
                tempArrClinic1_1.push(clinicType[1]);
                return [3 /*break*/, 111];
            case 108:
                if (!(clinicResponseMenu === "3")) return [3 /*break*/, 109];
                tempArrClinic1_1.push(clinicType[2]);
                return [3 /*break*/, 111];
            case 109:
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 110:
                _d.sent();
                _d.label = 111;
            case 111:
                tempAdr22_1.splice(0, tempAdr22_1.length);
                clinics.forEach(function (clinic) {
                    if (clinic.name === tempArrClinic1_1[0]) {
                        clinic.name = tempArrClinic1_1[1];
                        clinic.address = tempArrClinic1_1[2];
                        clinic.city = tempArrClinic1_1[3];
                        clinic.type = tempArrClinic1_1[4];
                    }
                });
                console.log("");
                console.log("   ".concat(chalk_1.default.blueBright("########################################################")));
                console.log("   ".concat(chalk_1.default.blueBright("########################################################"), "\n"));
                console.log("   Obiekt o podanej nazwie: ".concat(chalk_1.default.blueBright(tempArrClinic1_1[0]), ",  zosta\u0142 pomy\u015Blnie zaktualizowany."));
                tempAdr22_1.splice(0, tempAdr22_1.length);
                tempArrClinic1_1.splice(0, tempArrClinic1_1.length);
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 112:
                _d.sent();
                return [3 /*break*/, 115];
            case 113: return [4 /*yield*/, backToMainMenu(String("0"))];
            case 114: return [2 /*return*/, _d.sent()];
            case 115: return [3 /*break*/, 147];
            case 116:
                if (!(selectedOpt === "3")) return [3 /*break*/, 120];
                if (!(clinics.length === 0)) return [3 /*break*/, 118];
                console.log("");
                console.log("   ".concat(chalk_1.default.yellowBright("W bazie danych nie ma aktualnie żadnej kliniki. Dodaj klinikę aby skorzystać z tej opcji")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 117:
                _d.sent();
                _d.label = 118;
            case 118:
                clinics.forEach(function (clinic) {
                    console.log("");
                    console.log("   ".concat(chalk_1.default.blackBright("dbID: "), " ").concat(chalk_1.default.yellowBright(clinic.id), ","));
                    console.log("   ".concat(chalk_1.default.blackBright("Nazwa placówki: "), " ").concat(chalk_1.default.greenBright(clinic.name), ","));
                    console.log("   ".concat(chalk_1.default.blackBright("Adres: "), " ").concat(chalk_1.default.greenBright(clinic.address), ","));
                    console.log("   ".concat(chalk_1.default.blackBright("Kod pocztowy i miasto: "), " ").concat(chalk_1.default.greenBright(clinic.city), ","));
                    console.log("   ".concat(chalk_1.default.blackBright("Typ placówki: "), " ").concat(chalk_1.default.greenBright(clinic.type), ","));
                    console.log("");
                });
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 119: return [2 /*return*/, _d.sent()];
            case 120:
                if (!(selectedOpt === "4")) return [3 /*break*/, 125];
                return [4 /*yield*/, askQuestion("\n   Podaj nazwę placówki: ")];
            case 121:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 122:
                _d.sent();
                return [4 /*yield*/, quantityValidator(clinicResponseMenu)];
            case 123:
                _d.sent();
                clinics.forEach(function (clinic) {
                    if (clinic.name === clinicResponseMenu) {
                        console.log("");
                        console.log("   ".concat(chalk_1.default.blackBright("dbID: "), " ").concat(chalk_1.default.yellowBright(clinic.id), ","));
                        console.log("   ".concat(chalk_1.default.blackBright("Nazwa placówki: "), " ").concat(chalk_1.default.greenBright(clinic.name), ","));
                        console.log("   ".concat(chalk_1.default.blackBright("Adres: "), " ").concat(chalk_1.default.greenBright(clinic.address), ","));
                        console.log("   ".concat(chalk_1.default.blackBright("Kod pocztowy i miasto: "), " ").concat(chalk_1.default.greenBright(clinic.city), ","));
                        console.log("   ".concat(chalk_1.default.blackBright("Typ placówki: "), " ").concat(chalk_1.default.greenBright(clinic.type), ","));
                        console.log("   ".concat(chalk_1.default.blackBright("Ilość aktywnych pacjentów: "), " ").concat(chalk_1.default.greenBright(clinic.patients.length), ","));
                    }
                });
                console.log("");
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 124:
                _d.sent();
                return [3 /*break*/, 147];
            case 125:
                if (!(selectedOpt === "5")) return [3 /*break*/, 132];
                if (!(clinics.length === 0)) return [3 /*break*/, 127];
                console.log("");
                console.log("   ".concat(chalk_1.default.yellowBright("W bazie danych nie ma aktualnie żadnej kliniki. Dodaj klinikę aby skorzystać z tej opcji")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 126:
                _d.sent();
                _d.label = 127;
            case 127: return [4 /*yield*/, askQuestion("\n   Podaj nazwę placówki: ")];
            case 128:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 129:
                _d.sent();
                return [4 /*yield*/, quantityValidator(clinicResponseMenu)];
            case 130:
                _d.sent();
                clinics.forEach(function (clinic) {
                    if (clinic.name === clinicResponseMenu) {
                        clinic.patients.forEach(function (patient) {
                            console.log("");
                            console.log("   ".concat(chalk_1.default.blackBright("dbID: "), " ").concat(chalk_1.default.yellowBright(patient.id), ","));
                            console.log("   ".concat(chalk_1.default.blackBright("Imię i nazwisko: "), " ").concat(chalk_1.default.greenBright(patient.name), ","));
                            console.log("   ".concat(chalk_1.default.blackBright("Pesel: "), " ").concat(chalk_1.default.greenBright(patient.personalID), ","));
                            console.log("   ".concat(chalk_1.default.blackBright("Płeć: "), " ").concat(chalk_1.default.greenBright(patient.gender), ","));
                            console.log("   ".concat(chalk_1.default.blackBright("Adres: "), " ").concat(chalk_1.default.greenBright(patient.address), ","));
                            console.log("   ".concat(chalk_1.default.blackBright("Kod pocztowy i miasto: "), " ").concat(chalk_1.default.greenBright(patient.city), ","));
                            console.log("   ".concat(chalk_1.default.blackBright("Numer telefonu: "), " ").concat(chalk_1.default.greenBright(patient.phoneNumber), ","));
                            console.log("   ".concat(chalk_1.default.blackBright("Adres email: "), " ").concat(chalk_1.default.greenBright(patient.email), ","));
                            console.log("   ".concat(chalk_1.default.blackBright("Numer karty pacjenta: "), " ").concat(chalk_1.default.greenBright(patient.cardNumber), ","));
                            console.log("   ".concat(chalk_1.default.blackBright("Data utworzenia konta: "), " ").concat(chalk_1.default.greenBright(patient.createdAt), ","));
                            console.log("");
                        });
                    }
                });
                console.log("");
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 131:
                _d.sent();
                return [3 /*break*/, 147];
            case 132:
                if (!(selectedOpt === "6")) return [3 /*break*/, 143];
                return [4 /*yield*/, validRole()];
            case 133:
                _d.sent();
                clinicToRemove_1 = "";
                clinicID_1 = "";
                return [4 /*yield*/, askQuestion("\n   Podaj nazwę placówki: ")];
            case 134:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 135:
                _d.sent();
                return [4 /*yield*/, quantityValidator(clinicResponseMenu)];
            case 136:
                _d.sent();
                clinics.filter(function (item) {
                    if (clinicResponseMenu === item.name) {
                        clinicID_1 = item.id;
                        clinicToRemove_1 = item.address;
                        return;
                    }
                });
                return [4 /*yield*/, askQuestion(chalk_1.default.redBright("\n   Przepisz adres plac\u00F3wki w celu usuni\u0119cia jej z bazy\n   [ ".concat(chalk_1.default.cyanBright("".concat(clinicToRemove_1)), " ]: ")))];
            case 137:
                clinicResponseMenu = _d.sent();
                return [4 /*yield*/, validValue(clinicResponseMenu)];
            case 138:
                _d.sent();
                if (!(clinicResponseMenu === clinicToRemove_1)) return [3 /*break*/, 140];
                index = clinics.findIndex(function (item) { return item.id === clinicID_1; });
                if (index !== -1) {
                    clinics.splice(index, 1);
                }
                console.log("");
                console.log("   ".concat(chalk_1.default.bold.bgRed("Placówka została pomyślnie usunięta.\n")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 139:
                _d.sent();
                return [3 /*break*/, 142];
            case 140:
                if (!(clinicResponseMenu !== clinicToRemove_1)) return [3 /*break*/, 142];
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Podana wartość jest nie prawidłowa. Placówka nie została usunięta.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 141:
                _d.sent();
                _d.label = 142;
            case 142: return [3 /*break*/, 147];
            case 143:
                if (!(selectedOpt === "0")) return [3 /*break*/, 145];
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 144: return [2 /*return*/, _d.sent()];
            case 145:
                console.log("");
                console.log("   ".concat(chalk_1.default.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")));
                return [4 /*yield*/, backToMainMenu(String("0"))];
            case 146:
                _d.sent();
                _d.label = 147;
            case 147: return [2 /*return*/];
        }
    });
}); };
// function verifyUser(login: string, password: string): boolean {
//
//     let loginUserPasswordHash: string = ""
//
//     users.filter(item => {
//         return item.email === login ? loginUserPasswordHash = item.passwordHash : ""
//     })
//
//     return bcrypt.compareSync(password, loginUserPasswordHash);
// }
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var validation, login_1, password_1, mainInvitation, mainRespons, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    validation = false;
                    if (!(currentUser === null)) return [3 /*break*/, 3];
                    return [4 /*yield*/, askQuestion(chalk_1.default.magentaBright("\n   Wprowadź login: \n   "))];
                case 1:
                    login_1 = _b.sent();
                    if (login_1 === "" || login_1.length > 75 || login_1.length < 5) {
                        console.log("   ".concat(chalk_1.default.redBright("Nie wpisano żadnej wartości lub nie spełnia ona kryteriów")));
                        process.exit(0);
                    }
                    return [4 /*yield*/, askQuestion(chalk_1.default.magentaBright("\n   Wprowadź hasło: \n   "))];
                case 2:
                    password_1 = _b.sent();
                    if (password_1 === "") {
                        console.log("   ".concat(chalk_1.default.redBright("Nie wpisano żadnej wartości")));
                        process.exit(0);
                    }
                    users.forEach(function (item) {
                        if (login_1 === item.name && password_1 === item.password) {
                            currentUser = item;
                            validation = true;
                            return;
                        }
                    });
                    if (!validation) {
                        console.log("");
                        console.log("   ".concat(chalk_1.default.redBright("Wprowadzono niepoprawny login lub hasło")));
                        process.exit(0);
                    }
                    _b.label = 3;
                case 3:
                    mainInvitation = "\n" +
                        "\n" +
                        chalk_1.default.bold.blackBright("   ########################################################\n") +
                        chalk_1.default.bold.blackBright("   ################################################\n") +
                        "\n" +
                        chalk_1.default.bold.greenBright("       Zalogowany user: ".concat(currentUser.name, " | Uprawnienia: ").concat(currentUser.role, "\n")) +
                        "\n" +
                        "       Menu g\u0142\u00F3wne | Aktualna data: ".concat(chalk_1.default.bold.underline.yellowBright((0, moment_1.default)().format('DD.MM.YYYY')), "\n") +
                        "\n" +
                        chalk_1.default.bold.blackBright("   ################################################\n") +
                        chalk_1.default.bold.blackBright("   ########################################################\n") +
                        "\n" +
                        "   Wybierz cyfrę i zatwierdź:\n" +
                        "\n" +
                        chalk_1.default.bold.yellowBright("   0.) Zako\u0144cz dzia\u0142anie programu,\n") +
                        chalk_1.default.cyanBright("   1.) ".concat(mainMenu[0], ",\n")) +
                        chalk_1.default.cyanBright("   2.) ".concat(mainMenu[1], ",\n")) +
                        chalk_1.default.cyanBright("   3.) ".concat(mainMenu[2], ",\n")) +
                        chalk_1.default.cyanBright("   4.) ".concat(mainMenu[3], ",\n")) +
                        chalk_1.default.cyanBright("   5.) ".concat(mainMenu[4], ",\n")) +
                        "\n" +
                        "   Wybrana ".concat(chalk_1.default.underline("cyfra"), ": ");
                    return [4 /*yield*/, askQuestion(mainInvitation)];
                case 4:
                    mainRespons = _b.sent();
                    return [4 /*yield*/, validValue(mainRespons)];
                case 5:
                    _b.sent();
                    _a = mainRespons;
                    switch (_a) {
                        case "0": return [3 /*break*/, 6];
                        case "1": return [3 /*break*/, 7];
                        case "2": return [3 /*break*/, 11];
                        case "3": return [3 /*break*/, 16];
                        case "4": return [3 /*break*/, 20];
                        case "5": return [3 /*break*/, 24];
                    }
                    return [3 /*break*/, 26];
                case 6:
                    console.log("");
                    console.log(chalk_1.default.bold.blackBright("   ##############################\n"));
                    console.log("   ".concat(chalk_1.default.greenBright("U\u017Cytkownik ".concat(chalk_1.default.bgBlack(currentUser.name), " zosta\u0142 wylogowany pomy\u015Blnie. Dzi\u0119kujemy!"))));
                    console.log("");
                    console.log(chalk_1.default.bold.blackBright("   ##############################\n"));
                    currentUser = null;
                    process.exit(0);
                    return [3 /*break*/, 28];
                case 7: return [4 /*yield*/, askQuestion(accountMenuPattern)];
                case 8:
                    mainRespons = _b.sent();
                    return [4 /*yield*/, validValue(mainRespons)];
                case 9:
                    _b.sent();
                    return [4 /*yield*/, handleMyAccount(mainRespons)];
                case 10:
                    _b.sent();
                    if (mainRespons === "0") {
                        console.log("");
                        console.log(chalk_1.default.yellowBright("   Good Bye!"));
                        return [2 /*return*/, backToMainMenu("0")];
                    }
                    return [3 /*break*/, 28];
                case 11: return [4 /*yield*/, validRole()];
                case 12:
                    _b.sent();
                    return [4 /*yield*/, askQuestion(adminMenuPattern)];
                case 13:
                    mainRespons = _b.sent();
                    return [4 /*yield*/, validValue(mainRespons)];
                case 14:
                    _b.sent();
                    return [4 /*yield*/, handleAdminMenu(mainRespons)];
                case 15:
                    _b.sent();
                    if (mainRespons === "0") {
                        console.log("");
                        console.log(chalk_1.default.yellowBright("   Good Bye!"));
                        return [2 /*return*/, backToMainMenu("0")];
                    }
                    return [3 /*break*/, 28];
                case 16: return [4 /*yield*/, askQuestion(patientMenuPattern)];
                case 17:
                    mainRespons = _b.sent();
                    return [4 /*yield*/, validValue(mainRespons)];
                case 18:
                    _b.sent();
                    return [4 /*yield*/, handlePatientMenu(mainRespons)];
                case 19:
                    _b.sent();
                    if (mainRespons === "0") {
                        console.log("");
                        console.log(chalk_1.default.yellowBright("   Good Bye!"));
                        return [2 /*return*/, backToMainMenu("0")];
                    }
                    return [3 /*break*/, 28];
                case 20: return [4 /*yield*/, askQuestion(clinicMenu)];
                case 21:
                    mainRespons = _b.sent();
                    return [4 /*yield*/, validValue(mainRespons)];
                case 22:
                    _b.sent();
                    return [4 /*yield*/, handleClinicMenu(mainRespons)];
                case 23:
                    _b.sent();
                    if (mainRespons === "0") {
                        console.log("");
                        console.log(chalk_1.default.yellowBright("   Good Bye!"));
                        return [2 /*return*/, backToMainMenu("0")];
                    }
                    return [3 /*break*/, 28];
                case 24:
                    switchUser = true;
                    currentUser = null;
                    return [4 /*yield*/, backToMainMenu(mainRespons)];
                case 25:
                    _b.sent();
                    return [3 /*break*/, 28];
                case 26: return [4 /*yield*/, backToMainMenu(mainRespons)];
                case 27: return [2 /*return*/, _b.sent()];
                case 28:
                    readline.close();
                    return [2 /*return*/];
            }
        });
    });
}
main().then(function (r) { return console.log(r); });
