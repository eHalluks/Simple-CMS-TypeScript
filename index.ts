/*

TODO: # można by było spróbować może napisać jakieś testy do tego, tak w ramach nauki,
TODO: # można pokminić coś z tym logowaniem i solą i hashem,
TODO: # można pokminić może zapis do pliku albo coś żeby nie trzeba było dymać za każdym razem danych od nowa,
TODO: # można popatrzeć czy jeszcze jakieś funkcjonalność nie warto dodać,

 */


import {v4 as uuid} from 'uuid';
import chalk from 'chalk';
import moment from "moment";
import bcrypt from 'bcryptjs';


const workPositions: string[] | null | undefined = ["managerLVL1", "managerLVL2", "managerLVL3", "clinicEmployee", "itEmployee", "administrationEmployee", "contractor", "internShip", "admin"]

const roles: string[] | null | undefined = ["read-only", "modify", "admin"];

const clinicType: string[] | undefined | null = ["Szpital", "Przychodnia", "Klinika"];

let switchUser: boolean = false;

interface UserRequest {
    id: string;
    name: string;
    date: string;
    content: string
    status: string;
}


interface User {
    id: string;
    name: string;
    password: string;
    passwordHash: string;
    salt: string
    email: string;
    role: string;
    workPosition: string;
    createdAt: string
}

interface Patient {
    id: string;
    name: string;
    personalID: string;
    gender: string;
    address: string;
    city: string;
    phoneNumber: string;
    email: string;
    cardNumber: string;
    createdAt: string;
}


interface Clinic {
    id: string;
    name: string;
    address: string;
    city: string;
    type: string;
    patients: Patient[] | null;
}

let currentUser: User | null = null;

const users: User[] | undefined | null = [
    {
        id: uuid(),
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

const patients: Patient[] | undefined | null = [

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

const clinics: Clinic[] | undefined | null = [

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

const userRequests: UserRequest[] = [
    {
        id: "weoifrj3498fn983nveer9gerg9ergm",
        name: "lukasz.de@example.com",
        date: "04.05.2023",
        content: "Proszę o zmianę mojej roli z read-only na modify",
        status: "Pending",
    }
];

const mainMenu: string[] | undefined | null = [
    "Moje konto",
    "Administrator CRUD",
    "Pacjent CRUD",
    "Przychodnia CRUD",
    "Przeloguj użytkownika",
]

const myAccountMenu: string[] | undefined | null = [
    "1.) Wyświetl moje dane",
    "2.) Edytuj moje dane",
    "3.) Poproś o zmianę roli",
    "4.) Wyświetl moje zgłoszenia",
    "5.) Edytuj swoje zgłoszenie",
]

const AdministratorMenu: string[] | undefined | null = [
    "1.) Dodaj nowego użytkownika",
    "2.) Usuń użytkownika",
    "3.) Zmodyfikuj dane użytkownika",
    "4.) Wyświetl wszystkich użytkowników",
    "5.) Wyświetl poszczególnego użytkownika",
    "6.) Wyświetl zapytania od użytkowników",
]

const pacjentMenu: string[] | undefined | null = [
    "1.) Dodaj nowego pacjenta",
    "2.) Edytuj dane pacjenta",
    "3.) Wyświetl wszystkie przychodnie do których należy pacjent",
    "4.) Wyświetl dane pacjenta",
    "5.) Wyświetl wszystkich pacjentów",
    "6.) Dodaj pacjenta do przychodni",
    "7.) Przenieś pacjenta do innej przychodni",
    "8.) Usuń pacjenta całkowicie z sieci",
]

const przychodniaMenu: string[] | undefined | null = [
    "1.) Dodaj nową przychodnie",
    "2.) Edytuj dane przychodni",
    "3.) Wyświetl wszystkie przychodnie",
    "4.) Wyświetl dane przychodni",
    "5.) Wyświetl wszystkich pacjentów z danej przychodni",
    "6.) Usuń przychodnie całkowicie z sieci",
]




const accountMenuPattern: string =
    chalk.bold.blackBright("   ##############################\n") +
    chalk.bold.blackBright("   ##############################\n") +
    chalk.bold.blackBright("   ##############################\n") +
    chalk.bold.blackBright("   ##############################\n") +
    chalk.bold.blackBright("   ##############################\n") +
    chalk.bold.blackBright("   ##############################\n") +
    "\n" +
    chalk.greenBright(`   Moje konto menu:\n`) +
    "\n" +
    chalk.bold.yellowBright(`   0.) Cofnij do menu główne\n`) +
    chalk.cyanBright(`   ${myAccountMenu[0]},\n`) +
    chalk.cyanBright(`   ${myAccountMenu[1]},\n`) +
    chalk.cyanBright(`   ${myAccountMenu[2]},\n`) +
    chalk.cyanBright(`   ${myAccountMenu[3]},\n`) +
    chalk.cyanBright(`   ${myAccountMenu[4]},\n`) +
    "\n" +
    `   Wybrana ${chalk.underline("cyfra")}: `;


const adminMenuPattern: string =
    chalk.bold.blackBright("   ##############################\n") +
    chalk.bold.blackBright("   ##############################\n") +
    chalk.bold.blackBright("   ##############################\n") +
    chalk.bold.blackBright("   ##############################\n") +
    chalk.bold.blackBright("   ##############################\n") +
    chalk.bold.blackBright("   ##############################\n") +
    "\n" +
    chalk.greenBright(`   Administrator menu:\n`) +
    "\n" +
    chalk.bold.yellowBright(`   0.) Cofnij do menu główne\n`) +
    chalk.cyanBright(`   ${AdministratorMenu[0]},\n`) +
    chalk.cyanBright(`   ${AdministratorMenu[1]},\n`) +
    chalk.cyanBright(`   ${AdministratorMenu[2]},\n`) +
    chalk.cyanBright(`   ${AdministratorMenu[3]},\n`) +
    chalk.cyanBright(`   ${AdministratorMenu[4]},\n`) +
    chalk.cyanBright(`   ${AdministratorMenu[5]},\n`) +
    "\n" +
    `   Wybrana ${chalk.underline("cyfra")}: `;

const patientMenuPattern: string =
    chalk.bold.blackBright("   ##############################\n") +
    chalk.bold.blackBright("   ##############################\n") +
    chalk.bold.blackBright("   ##############################\n") +
    chalk.bold.blackBright("   ##############################\n") +
    chalk.bold.blackBright("   ##############################\n") +
    chalk.bold.blackBright("   ##############################\n") +
    "\n" +
    chalk.greenBright(`   Pacjent menu:\n`) +
    "\n" +
    chalk.bold.yellowBright(`   0.) Cofnij do menu główne\n`) +
    chalk.cyanBright(`   ${pacjentMenu[0]},\n`) +
    chalk.cyanBright(`   ${pacjentMenu[1]},\n`) +
    chalk.cyanBright(`   ${pacjentMenu[2]},\n`) +
    chalk.cyanBright(`   ${pacjentMenu[3]},\n`) +
    chalk.cyanBright(`   ${pacjentMenu[4]},\n`) +
    chalk.cyanBright(`   ${pacjentMenu[5]},\n`) +
    chalk.cyanBright(`   ${pacjentMenu[6]},\n`) +
    chalk.cyanBright(`   ${pacjentMenu[7]},\n`) +
    "\n" +
    `   Wybrana ${chalk.underline("cyfra")}: `;

const clinicMenu: string =
    chalk.bold.blackBright("   ##############################\n") +
    chalk.bold.blackBright("   ##############################\n") +
    chalk.bold.blackBright("   ##############################\n") +
    chalk.bold.blackBright("   ##############################\n") +
    chalk.bold.blackBright("   ##############################\n") +
    chalk.bold.blackBright("   ##############################\n") +
    "\n" +
    chalk.greenBright(`   Przychodnia menu:\n`) +
    "\n" +
    chalk.bold.yellowBright(`   0.) Cofnij do menu główne\n`) +
    chalk.cyanBright(`   ${przychodniaMenu[0]},\n`) +
    chalk.cyanBright(`   ${przychodniaMenu[1]},\n`) +
    chalk.cyanBright(`   ${przychodniaMenu[2]},\n`) +
    chalk.cyanBright(`   ${przychodniaMenu[3]},\n`) +
    chalk.cyanBright(`   ${przychodniaMenu[4]},\n`) +
    chalk.cyanBright(`   ${przychodniaMenu[5]},\n`) +
    "\n" +
    `   Wybrana ${chalk.underline("cyfra")}: `;


const editMyAccountPattern: string =
    "\n" +
    "   Które dane chcesz edytować:\n" +
    "\n" +
    "   0.) Przerwij, \n" +
    "\n" +
    "   1.) Imię i nazwisko, \n" +
    "\n" +
    `   Wybrana ${chalk.underline("cyfra")}: `;


const addRoleToNewUser: string =
    "\n" +
    "   Wybierz rolę :\n" +
    "\n" +
    "   0.) Przerwij, \n" +
    "\n" +
    "   1.) read-only, \n" +
    "   2.) modify, \n" +
    "   3.) admin, \n" +
    "\n" +
    `   Wybrana ${chalk.underline("cyfra")}: `;


const addWorkPositionToNewUser: string =
    "\n" +
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
    `   Wybrana ${chalk.underline("cyfra")}: `;


const adminEditUserPattern: string =
    "\n" +
    "   Wybierz dane do edycji:\n" +
    "\n" +
    "   0.) Przerwij, \n" +
    "\n" +
    "   1.) Imię i nazwisko, \n" +
    "   2.) Stanowisko pracy, \n" +
    "   3.) Rola, \n" +
    "   4.) Hasło, \n" +
    "\n" +
    `   Wybrana ${chalk.underline("cyfra")}: `;


const ticketAction: string =
    "\n" +
    "   Czy chcesz realizować zgłoszenie:\n" +
    "\n" +
    "   1.) TAK, \n" +
    "   2.) NIE, \n" +
    "\n" +
    `   Wybrana ${chalk.underline("cyfra")}: `;

const patientToEditPattern: string =
    "\n" +
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
    `   Wybrana ${chalk.underline("cyfra")}: `;

const selectGender: string =
    "\n" +
    "   Wybierz płeć:\n" +
    "\n" +
    "   1.) Kobieta, \n" +
    "   2.) Mężczyzna, \n" +
    "   3.) Inna, \n" +
    "\n" +
    `   Wybrana ${chalk.underline("cyfra")}: `;

const editMany: string =
    "\n" +
    "   Wybierz opcje edycji danych:\n" +
    "\n" +
    "   0.) Przerwij, \n" +
    "\n" +
    "   1.) Edytuj konkretne, \n" +
    "   2.) Edytuj wiele, \n" +
    "\n" +
    `   Wybrana ${chalk.underline("cyfra")}: `;

const clinicMenuType: string =
    "\n" +
    "   Wybierz typ obiektu medycznego:\n" +
    "\n" +
    "   1.) Szpital, \n" +
    "   2.) Przychodnia, \n" +
    "   3.) Klinika, \n" +
    "\n" +
    `   Wybrana ${chalk.underline("cyfra")}: `;

const addPatientToClinicMenu: string =
    "\n" +
    "   Czy chcesz dodać pacjentów:\n" +
    "\n" +
    "   1.) NIE, \n" +
    "   2.) TAK - Dodaje wiele, \n" +
    "   3.) TAK - Dodaję pojedynczo, \n" +
    "\n" +
    `   Wybrana ${chalk.underline("cyfra")}: `;

const editMenuClinic: string =
    "\n" +
    "   Które dane chcesz edytować:\n" +
    "\n" +
    "   0.) Przerwij, \n" +
    "\n" +
    "   1.) Nazwa placówki, \n" +
    "   2.) Adres, \n" +
    "   3.) Kod pocztowy i miasto, \n" +
    "   4.) Typ, \n" +
    "\n" +
    `   Wybrana ${chalk.underline("cyfra")}: `;

const ticketToEditPattern: string =
    "\n" +
    "   Które dane chcesz edytować:\n" +
    "\n" +
    "   0.) Przerwij, \n" +
    "\n" +
    "   1.) Kontent, \n" +
    "   2.) Status, \n" +
    "\n" +
    `   Wybrana ${chalk.underline("cyfra")}: `;

const ticketStatuses: string =
    "\n" +
    "   Wybierz status zgłoszenia:\n" +
    "\n" +
    "   0.) Przerwij, \n" +
    "\n" +
    "   1.) New, \n" +
    "   2.) Pending, \n" +
    "   3.) Closed, \n" +
    "\n" +
    `   Wybrana ${chalk.underline("cyfra")}: `;


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const generateRandomPassword = (): string => {
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$^&*(){}[];:/|<>.,";
    let password = "";

    for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }

    return password;
}

function askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
        readline.question(question, (answer: string) => {
            resolve(answer);
        });
    });
}


async function backToMainMenu(mainRespons) {

    mainRespons = String(mainRespons);
    if(switchUser === true){
        return await main();
    }else if(mainRespons === "0" || mainRespons === 0) {
        return await main();
    }else if (mainRespons !== "0" || mainRespons !== "1" || mainRespons !== "2" || mainRespons !== "3" || mainRespons !== "4") {
        await console.log("")
        await console.log(`   ${chalk.redBright("Wybrany numer jest nieprawidłowy!. Sprawdź numer i Spróbuj ponownie.")}`)
        await main()
    } else {
        return await main();
    }
}

const createEmailAddress = (email: string) => {

    const domena = "example.com";
    const [name, surname] = email.split(" ");
    return `${name.toLowerCase()}.${surname.toLowerCase()}@${domena}`

}

const validRole = () => {

    if (currentUser.role === "read-only") {
        console.log("")
        console.log(`   ${chalk.redBright("Odmowa dostępu")}`)
        return backToMainMenu("0");
    }

}

const validValue = valueToCheck => {

    if (valueToCheck === "" || valueToCheck === null || valueToCheck === undefined){
        console.log("")
        console.log(`   ${chalk.redBright("Nie wprowadzono żadnej wartości.")}`)
        return backToMainMenu("0");
    }

}

const personalIDValidator = personalID => {

    if (personalID.length < 8){
        console.log("")
        console.log(`   ${chalk.redBright("Ilość znaków nie może być mniejsza niż 8.")}`)
        return backToMainMenu("0");
    }

}

const quantityValidator = valueToCheck => {

    if (valueToCheck.length < 5 || valueToCheck.length > 75){
        console.log("")
        console.log(`   ${chalk.redBright("Podana ilość znaków jest nie prawidłowa.")}`)
        return backToMainMenu("0");
    }

}

const handleMyAccount = async selectedOpt => {

    let myAccountResponse: string = ""

    if(selectedOpt === "1") {

        users.filter(item => {
            if (currentUser.id === item.id) {
                console.log("")
                console.log(`   ${chalk.blueBright("Twoje dane to:")}\n`)
                console.log(`   Imię i nazwisko: ${chalk.blueBright(`${item.name}`)},`);
                console.log(`   Adres email: ${chalk.blueBright(`${item.email}`)},`);
                console.log(`   Rola: ${chalk.blueBright(`${item.role}`)},`);
                console.log(`   Stanowisko: ${chalk.blueBright(`${item.workPosition},`)}`);
                console.log("")
            }
        })
        await backToMainMenu(String( "0"));

    }


    else if (selectedOpt === "2") {

        myAccountResponse = await askQuestion(editMyAccountPattern);
        await validValue(myAccountResponse);

        if(myAccountResponse === "0"){

            await backToMainMenu(String( "0"));

        }else if(myAccountResponse === "1"){

            let duplicatedUserNameFounded: boolean | string = false;
            console.log("")
            myAccountResponse = await askQuestion("   Wprowadź nowe imię i nazwisko: ");
            await validValue(myAccountResponse);
            await quantityValidator(myAccountResponse);

            users.forEach(item => {
                if(item.name === myAccountResponse){
                    duplicatedUserNameFounded = true;
                }
            })

            if (duplicatedUserNameFounded){
                console.log("")
                console.log(`   ${chalk.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")}`)
                await backToMainMenu(String( "0"));
            }

            users.forEach(item => {
                if (currentUser.id === item.id) {
                    item.name = myAccountResponse;
                    item.email = createEmailAddress(item.name);
                    duplicatedUserNameFounded = item.name
                }
            })

            console.log("")
            console.log(`   ${chalk.bgBlue("Twoje imię i nazwisko zostało zmienione pomyślnie na:\n")}`);
            console.log(`   ${chalk.blueBright("Nowe imię i nazwisko: ")}${duplicatedUserNameFounded}`);
            await backToMainMenu(String( "0"));

        }else{

            console.log("")
            console.log(`   ${chalk.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")}`)
            await backToMainMenu(String( "0"));

        }



    }else if (selectedOpt === "3") {

        let newRoleToRequest: string = "";

        if (currentUser.role === "read-only") {

            const newRoleForMe: string =
                "\n" +
                "   Wybierz rolę :\n" +
                "\n" +
                "   0.) Przerwij, \n" +
                "\n" +
                "   1.) modify, \n" +
                "   2.) admin, \n" +
                "\n" +
                `   Wybrana ${chalk.underline("cyfra")}: `;

            myAccountResponse = await askQuestion(newRoleForMe);
            await validValue(myAccountResponse);

            switch (myAccountResponse) {
                case "0":
                    await backToMainMenu(String("0"));
                    break;
                case "1":
                    newRoleToRequest = roles[1];
                    break;
                case "2":
                    newRoleToRequest = roles[2];
                    break;
                default:
                    console.log("")
                    console.log(`   ${chalk.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")}`)
                    await backToMainMenu(String("0"));
                    break;
            }


        } else if (currentUser.role === "modify") {

            const newRoleForMe: string =
                "\n" +
                "   Wybierz rolę :\n" +
                "\n" +
                "   0.) Przerwij, \n" +
                "\n" +
                "   1.) read-only, \n" +
                "   2.) admin, \n" +
                "\n" +
                `   Wybrana ${chalk.underline("cyfra")}: `;

            myAccountResponse = await askQuestion(newRoleForMe);
            await validValue(myAccountResponse);

            switch (myAccountResponse) {
                case "0":
                    await backToMainMenu(String("0"));
                    break;
                case "1":
                    newRoleToRequest = roles[0];
                    break;
                case "2":
                    newRoleToRequest = roles[2];
                    break;
                default:
                    console.log("")
                    console.log(`   ${chalk.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")}`)
                    await backToMainMenu(String("0"));
                    break;
            }

        } else if (currentUser.role === "admin") {

            console.log("")
            console.log(`   ${chalk.redBright("Unexpected role error. Admin role can not be downgraded")}`)
            await backToMainMenu(String("0"));

        }

        const newRequest: { id: string, name: string, content: string, status: string, date: string } = {
            id: uuid(),
            name: currentUser.email,
            date: moment().format('DD.MM.YYYY'),
            content: `Proszę o zmianę mojej roli z ${currentUser.role} na ${newRoleToRequest}.`,
            status: "Pending",
        };

        userRequests.push(newRequest);
        await console.log("");
        await console.log(`   ${chalk.bgBlue("Twoje zgłoszenie zostało przesłane. Oczekuj proszę na kontakt w tej sprawie.\n")}`);
        await backToMainMenu(String("0"));

    }else if (selectedOpt === "4") {

        let requestNotFound: boolean = false;

        userRequests.filter(item => {

            if(item.name === currentUser.email){

                console.log("");
                console.log(`   ID Zgłoszenia: ${chalk.bold.blackBright(`${chalk.yellowBright(item.id)}`)},`);
                console.log(`   Data utworzenia: ${chalk.bold.blackBright(`${chalk.yellowBright(item.date)}`)},`);
                console.log(`   Zgłaszający: ${chalk.bold.blackBright(`${chalk.yellowBright(item.name)}`)},`);
                console.log(`   Opis: ${chalk.bold.blackBright(`${chalk.yellowBright(item.content)}`)},`);
                console.log(`   Status: ${chalk.bold.blackBright(`${chalk.yellowBright(item.status)}`)},`);
                console.log("");
                requestNotFound = true
            }

        })

        if(!requestNotFound){

            console.log("")
            console.log(`   ${chalk.redBright("Obecnie nie posiadasz żadnych przesłanych zgłoszeń")}`);
            await backToMainMenu(String("0"));

        }else{
            await backToMainMenu(String("0"));
        }



    }else if(selectedOpt === "5"){

        if (currentUser.role === "admin") {
            console.log("")
            console.log(`   ${chalk.redBright("Unexpected userError: Administratorzy nie posiadają zgłoszeń")}`);
            await backToMainMenu(String("0"));
        }


        myAccountResponse = await askQuestion("\n   Podaj numer zgłoszenia: ");
        await validValue(myAccountResponse);
        await quantityValidator(myAccountResponse);

        const ticketNumber: string = myAccountResponse.trim();
        myAccountResponse = await askQuestion(ticketToEditPattern);

        switch (myAccountResponse) {

            case "0":
                await backToMainMenu(String("0"));
                break;

            case "1":

                if (currentUser.role === "read-only") {

                    const newRoleForMe: string =
                        "\n" +
                        "   Wybierz rolę :\n" +
                        "\n" +
                        "   0.) Przerwij, \n" +
                        "\n" +
                        "   1.) modify, \n" +
                        "   2.) admin, \n" +
                        "\n" +
                        `   Wybrana ${chalk.underline("cyfra")}: `;

                    myAccountResponse = await askQuestion(newRoleForMe);
                    await validValue(myAccountResponse);

                    switch (myAccountResponse) {
                        case "0":

                            await backToMainMenu(String("0"));

                            break;
                        case "1":

                            userRequests.forEach(item => {
                                if (item.id === ticketNumber) {
                                    item.content = `Proszę o zmianę mojej roli z ${currentUser.role} na ${roles[1]}.`;
                                }
                            });


                            console.log("");
                            console.log(`\n   ${chalk.blueBright("Twoje zgłoszenie zostało pomyślnie zaktualizowane.")}`);
                            await backToMainMenu(String("0"));

                            break;
                        case "2":

                            userRequests.forEach(item => {
                                if (item.id === ticketNumber) {
                                    item.content = `Proszę o zmianę mojej roli z ${currentUser.role} na ${roles[2]}.`;
                                }
                            });

                            console.log("");
                            console.log(`\n   ${chalk.blueBright("Twoje zgłoszenie zostało pomyślnie zaktualizowane.")}`);
                            await backToMainMenu(String("0"));

                            break;

                        default:
                            console.log("")
                            console.log(`   ${chalk.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")}`)
                            await backToMainMenu(String("0"));
                            break;
                    }


                } else if (currentUser.role === "modify") {

                    const newRoleForMe: string =
                        "\n" +
                        "   Wybierz rolę :\n" +
                        "\n" +
                        "   0.) Przerwij, \n" +
                        "\n" +
                        "   1.) read-only, \n" +
                        "   2.) admin, \n" +
                        "\n" +
                        `   Wybrana ${chalk.underline("cyfra")}: `;

                    myAccountResponse = await askQuestion(newRoleForMe);
                    await validValue(myAccountResponse);

                    switch (myAccountResponse) {
                        case "0":

                            await backToMainMenu(String("0"));

                            break;
                        case "1":

                            userRequests.forEach(item => {
                                if (item.id === ticketNumber) {
                                    item.content = `Proszę o zmianę mojej roli z ${item.content} na ${roles[0]}.`
                                }
                            });

                            console.log("");
                            console.log(`\n   ${chalk.blueBright("Twoje zgłoszenie zostało pomyślnie zaktualizowane.")}`);
                            await backToMainMenu(String("0"));

                            break;
                        case "2":

                            userRequests.forEach(item => {
                                if (item.id === ticketNumber) {
                                    item.content = `Proszę o zmianę mojej roli z ${item.content} na ${roles[2]}.`
                                }
                            });

                            console.log("");
                            console.log(`\n   ${chalk.blueBright("Twoje zgłoszenie zostało pomyślnie zaktualizowane.")}`);
                            await backToMainMenu(String("0"));


                            break;
                        default:

                            console.log("")
                            console.log(`   ${chalk.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")}`)
                            await backToMainMenu(String("0"));

                            break;

                    }

                } else if (currentUser.role === "admin") {

                    console.log("")
                    console.log(`   ${chalk.redBright("Unexpected userError: Administratorzy nie tworzą i nie edytują zgłoszeń do siebie samych.")}`);
                    await backToMainMenu(String("0"));

                }

                break
            case "2":

                myAccountResponse = await askQuestion(ticketStatuses);
                await validValue(myAccountResponse);

                switch (myAccountResponse) {
                    case "0":
                        await backToMainMenu(String("0"));
                        break;
                    case "1":

                        userRequests.forEach(item => {
                            if (item.id === ticketNumber) {
                                item.status = "New";
                            }
                        });

                        console.log("");
                        console.log(`\n   ${chalk.blueBright("Twoje zgłoszenie zostało pomyślnie zaktualizowane.")}`);
                        await backToMainMenu(String("0"));

                        break;
                    case "2":

                        userRequests.forEach(item => {
                            if (item.id === ticketNumber) {
                                item.status = "Pending";
                            }
                        });

                        console.log("");
                        console.log(`\n   ${chalk.blueBright("Twoje zgłoszenie zostało pomyślnie zaktualizowane.")}`);
                        await backToMainMenu(String("0"));

                        break;
                    case "3":

                        userRequests.forEach(item => {
                            if (item.id === ticketNumber) {
                                item.status = "Closed";
                            }
                        });

                        console.log("");
                        console.log(`\n   ${chalk.blueBright("Twoje zgłoszenie zostało pomyślnie zaktualizowane.")}`);
                        await backToMainMenu(String("0"));

                        break;
                    default:
                        console.log("")
                        console.log(`   ${chalk.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")}`)
                        await backToMainMenu(String("0"));
                        break;
                }

                break;

            default:
                console.log("")
                console.log(`   ${chalk.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")}`)
                await backToMainMenu(String("0"));
                break;

        }

    }else if (selectedOpt === "0") {

        await backToMainMenu(String( "0"));

    }else{

        console.log("")
        console.log(`   ${chalk.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")}`)
        await backToMainMenu(String( "0"));

    }

}

const handleAdminMenu = async selectedOpt => {

    let adminAccountResponse: string = ""
    const tempArr: string[] = []

    if (selectedOpt === "1") {

        adminAccountResponse = await askQuestion("\n   1.) Podaj imię i nazwisko: ");
        await validValue(adminAccountResponse);
        await quantityValidator(adminAccountResponse);

        users.forEach(item => {
            if(item.name === adminAccountResponse){
                adminAccountResponse = `${adminAccountResponse}${Math.floor(Math.random() * 100) + 1}`;
            }
        });


        tempArr.push(adminAccountResponse);

        adminAccountResponse = await askQuestion(addRoleToNewUser);
        await validValue(adminAccountResponse);

        switch (adminAccountResponse) {
            case "0":
                await backToMainMenu(String( "0"));
                break;
            case "1":
                tempArr.push(roles[0]);
                break;
            case "2":
                tempArr.push(roles[1]);
                break;
            case "3":
                tempArr.push(roles[2]);
                break;
            default:
                console.log("");
                console.log(`   ${chalk.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")}`);
                await backToMainMenu(String( "0"));
                break;
        }

        console.log("")

        adminAccountResponse = await askQuestion(addWorkPositionToNewUser);
        await validValue(adminAccountResponse);

        switch (adminAccountResponse) {
            case "0":
                await backToMainMenu(String( "0"));
                break;
            case "1":
                tempArr.push(workPositions[0])
                break;
            case "2":
                tempArr.push(workPositions[1])
                break;
            case "3":
                tempArr.push(workPositions[2])
                break;
            case "4":
                tempArr.push(workPositions[3])
                break;
            case "5":
                tempArr.push(workPositions[4])
                break;
            case "6":
                tempArr.push(workPositions[5])
                break;
            case "7":
                tempArr.push(workPositions[6])
                break;
            case "8":
                tempArr.push(workPositions[7])
                break;
            case "9":
                tempArr.push(workPositions[8])
                break;
            default:
                console.log("");
                console.log(`   ${chalk.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")}`);
                await backToMainMenu(String( "0"));
                break;
        }
        console.log("")
        tempArr.push(adminAccountResponse);

        const createdEmailAddress = createEmailAddress(tempArr[0]);

        const password: string = generateRandomPassword();
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);

        const newUserToAdd: User = {
            id: uuid(),
            name: tempArr[0],
            password: password,
            passwordHash: passwordHash,
            salt: salt,
            email: createdEmailAddress,
            role: tempArr[1],
            workPosition: tempArr[2],
            createdAt: String(moment().format('DD.MM.YYYY')),
        };

        users.push(newUserToAdd);
        console.log("");
        console.log(`   ${chalk.blueBright("########################################################")}`);
        console.log(`   ${chalk.blueBright("########################################################")}\n`);
        console.log(`   ${chalk.bold.bgBlue(" Nowy użytkownik został dodany do bazy pomyślnie \n")}`);
        await backToMainMenu(String( "0"));

    } else if (selectedOpt === "2") {

        let userToRemove: string = "";

        adminAccountResponse = await askQuestion("\n   Podaj nazwę użytkownika którego chcesz usunąć: ");
        await validValue(adminAccountResponse);
        await quantityValidator(adminAccountResponse);

        if(currentUser.name === adminAccountResponse){
            console.log("");
            console.log(`   ${chalk.redBright("Nie można usunąć siebie samego będąc zalogowanym.")}`);
            await backToMainMenu(String( "0"));
        }else if(adminAccountResponse === "admin"){
            console.log("");
            console.log(`   ${chalk.redBright("Konto master admin nie może zostać usunięte.")}`);
            await backToMainMenu(String( "0"));
        }

        users.filter(item => {
            if(adminAccountResponse === item.name){
                userToRemove = item.email
                return;
            }
        });

        adminAccountResponse = await askQuestion(chalk.redBright(`\n   Przepisz adres email użytkownika w celu usunięcia go z bazy\n   [ ${chalk.cyanBright(`${userToRemove}`)} ]: `));
        await validValue(adminAccountResponse);
        await quantityValidator(adminAccountResponse);

        if(adminAccountResponse === userToRemove){

            const index = users.findIndex(item => item.email === userToRemove);
            if (index !== -1) {
                users.splice(index, 1);
            }
            console.log("")
            console.log(`   ${chalk.bold.bgRed("Użytkownik został pomyślnie usunięty.\n")}`)
            await backToMainMenu(String( "0"));

        }else {

            console.log("");
            console.log(`   ${chalk.redBright("Podana wartość jest nie prawidłowa. Użytkownik nie został usunięty.")}`);
            await backToMainMenu(String( "0"));

        }


    } else if (selectedOpt === "3") {

        let editedEmailForTickets: string = "";
        let newEmailToAssign: string = "";

        adminAccountResponse = await askQuestion("\n   Podaj nazwę użytkownika którego chcesz edytować: ");
        await validValue(adminAccountResponse);
        await quantityValidator(adminAccountResponse);

        let flag1: boolean = false;

        users.forEach(item => {
            if(item.name === adminAccountResponse){
                return flag1 = true;
            }
        });

        if (flag1 === false ){
            console.log(`\n   ${chalk.redBright(`Podana nazwa użytkownika nie została odnaleziona w bazie. Sprawdź nazwę lub dodaj użytkownika.`)}`);
            await backToMainMenu(String( "0"));
        }

        const userToChange: string = adminAccountResponse;

        adminAccountResponse = await askQuestion(adminEditUserPattern);
        await validValue(adminAccountResponse);

        switch (adminAccountResponse){


            case "0":

                await backToMainMenu(String( "0"));
                break;

            case "1":

                const userNameToFind = userToChange;
                adminAccountResponse = await askQuestion("\n   1.) Podaj nową nazwę użytkownika: ");
                if(adminAccountResponse.trim() === userToChange.trim()){
                    console.log(`\n   ${chalk.redBright("Podana wartość musi różnić się od aktualnie zapisanej.")}`);
                    await backToMainMenu(String( "0"));
                }
                await validValue(adminAccountResponse);
                await quantityValidator(adminAccountResponse);
                const newUserName: string = adminAccountResponse;

                let flag: boolean = false;

                users.forEach(user => {
                    if(user.name === newUserName){
                        console.log(`   ${chalk.redBright(`Podana nazwa użytkownika już istnieje w bazie`)}`);
                        return flag = true;
                    }
                })

                if(flag) {

                    await backToMainMenu(String( "0"));

                }else{

                    users.forEach(user => {
                        if(userNameToFind === user.name){
                            flag = true;
                            user.name = newUserName;
                            editedEmailForTickets = user.email;
                            user.email = createEmailAddress(user.name);
                            newEmailToAssign = user.email;
                        }
                    })

                    userRequests.forEach(request => {
                        if (request.name === editedEmailForTickets){
                            request.name = newEmailToAssign;
                        }
                    });

                }

                if(flag){
                    console.log("")
                    console.log(`   ${chalk.blueBright(`Stara nazwa użytkownika: ${chalk.redBright(`${userNameToFind}`)}\n   została pomyślnie zmieniona na: ${chalk.greenBright(`${newUserName}`)}`)}`)
                    await backToMainMenu(String( "0"));
                }

                break;

            case "2":

                const userNameToFind2 = userToChange;
                adminAccountResponse = await askQuestion(addWorkPositionToNewUser);
                await validValue(adminAccountResponse);
                let editedWorkPositionUser: string = "";

                switch (adminAccountResponse) {

                    case "0":
                        await backToMainMenu(String( "0"));
                        break;
                    case "1":
                        editedWorkPositionUser = workPositions[0];
                        break;
                    case "2":
                        editedWorkPositionUser = workPositions[1];
                        break;
                    case "3":
                        editedWorkPositionUser = workPositions[2];
                        break;
                    case "4":
                        editedWorkPositionUser = workPositions[3];
                        break;
                    case "5":
                        editedWorkPositionUser = workPositions[4];
                        break;
                    case "6":
                        editedWorkPositionUser = workPositions[5];
                        break;
                    case "7":
                        editedWorkPositionUser = workPositions[6];
                        break;
                    case "8":
                        editedWorkPositionUser = workPositions[7];
                        break;
                    case "9":
                        editedWorkPositionUser = workPositions[8];
                        break;
                    default:
                        console.log("")
                        console.log(`   ${chalk.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")}`)
                        await backToMainMenu(String( "0"));
                        break;
                }

                await users.forEach(user => {
                    if(user.name === userNameToFind2){
                        user.workPosition = editedWorkPositionUser;
                        console.log("");
                        console.log(`   ${chalk.blueBright(`Poprzednie stanowisko zostało pomyślnie zmienione na: ${chalk.greenBright(`${editedWorkPositionUser}`)}\n`)}`);
                    }
                })

                await backToMainMenu(String( "0"));


                break;
            case "3":

                const userNameToFind3 = userToChange;
                adminAccountResponse = await askQuestion(addRoleToNewUser);
                await validValue(adminAccountResponse);
                let userRoleToEdit: string = "";
                let flagRoleEditing: boolean = false;

                switch (adminAccountResponse) {
                    case "0":
                        await backToMainMenu(String( "0"));
                        break;
                    case "1":
                        userRoleToEdit = roles[0];
                        break;
                    case "2":
                        userRoleToEdit = roles[1];
                        break;
                    case "3":
                        userRoleToEdit = roles[2];
                        break;
                    default:
                        console.log("")
                        console.log(`   ${chalk.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")}`)
                        await backToMainMenu(String( "0"));
                        break;
                }

                users.forEach(user => {
                    if(userNameToFind3 === user.name){
                        flagRoleEditing = true;
                        user.role = userRoleToEdit;
                    }
                })

                if(flagRoleEditing) {
                    console.log("");
                    console.log(`   ${chalk.blueBright(`Poprzednia rola została pomyślnie zmieniona na: ${chalk.greenBright(`${userRoleToEdit}`)}\n`)}`);
                    await backToMainMenu(String( "0"));
                }

                break;
            case "4":

                const userNameToFind4 = userToChange;
                let passwordChange: boolean = false;
                adminAccountResponse = await askQuestion("\n   Podaj nowe hasło: ");
                await validValue(adminAccountResponse);
                await personalIDValidator(adminAccountResponse);

                users.forEach(user => {
                    if(userNameToFind4 === user.name){
                        user.password = adminAccountResponse;
                        passwordChange = true
                    }
                })

                if(passwordChange){

                    console.log("");
                    console.log(`   ${chalk.cyanBright(`Hasło użytkownika: [ ${chalk.redBright(`${userNameToFind4}`)} ] zostało pomyślnie zmienione\n`)}`);
                    await backToMainMenu(String( "0"));

                }else{

                    console.log("")
                    console.log(`   ${chalk.redBright("Nie udało się zmienić hasła. Pracownik nie zostało odnaleziony w bazie")}`)
                    await backToMainMenu(String( "0"));

                }

                break;
            default:
                console.log("")
                console.log(`   ${chalk.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")}`)
                await backToMainMenu(String( "0"));
                break;
        }


    } else if (selectedOpt === "4") {

        users.forEach(user => {
            console.log("")
            console.log(`   ${chalk.blackBright("dbID:")} ${chalk.yellowBright(user.id)}`);
            console.log(`   ${chalk.blackBright("dodano:")} ${chalk.yellowBright(user.createdAt)}`);
            console.log(`   ${chalk.blackBright("Użytkownik:")} ${chalk.yellowBright(user.name)}`);
            console.log(`   ${chalk.blackBright("Adres email:")} ${chalk.yellowBright(user.email)}`);
            console.log(`   ${chalk.blackBright("Rola:")} ${chalk.yellowBright(user.role)}`);
            console.log(`   ${chalk.blackBright("Stanowisko:")} ${chalk.yellowBright(user.workPosition)}`);
            console.log(`   ${chalk.blackBright("password:")} ${chalk.greenBright(user.password)}`);
            console.log(`   ${chalk.blackBright("hash:")} ${chalk.greenBright(user.passwordHash)}`);
            console.log(`   ${chalk.blackBright("salt:")} ${chalk.greenBright(user.salt)}`);
            console.log("");
        })

        await backToMainMenu(String( "0"));

    } else if (selectedOpt === "5") {

        adminAccountResponse = await askQuestion("\n   Podaj nazwę użytkownika którego chcesz znaleźć: ");
        await validValue(adminAccountResponse);
        await quantityValidator(adminAccountResponse);

        const userNameToFind5 = adminAccountResponse;
        let foundUser: boolean = false

        users.filter(user => {


            if(userNameToFind5 === user.name){

                foundUser = true
                console.log("");
                console.log(`   ${chalk.blackBright("dbID:")} ${chalk.yellowBright(user.id)}`);
                console.log(`   ${chalk.blackBright("dodano:")} ${chalk.yellowBright(user.createdAt)}`);
                console.log(`   ${chalk.blackBright("Użytkownik:")} ${chalk.yellowBright(user.name)}`);
                console.log(`   ${chalk.blackBright("Adres email:")} ${chalk.yellowBright(user.email)}`);
                console.log(`   ${chalk.blackBright("Rola:")} ${chalk.yellowBright(user.role)}`);
                console.log(`   ${chalk.blackBright("Stanowisko:")} ${chalk.yellowBright(user.workPosition)}`);
                console.log(`   ${chalk.blackBright("password:")} ${chalk.greenBright(user.password)}`);
                console.log(`   ${chalk.blackBright("hash:")} ${chalk.greenBright(user.passwordHash)}`);
                console.log(`   ${chalk.blackBright("salt:")} ${chalk.greenBright(user.salt)}`);

            }

        })

        if(!foundUser){
            console.log("")
            console.log(`   ${chalk.redBright("Użytkownik o podanej nazwie nie został odnaleziony w bazie. Sprawdź nazwę i spróbuj ponownie.")}`)
            await backToMainMenu(String( "0"));
        }
        console.log("");
        await backToMainMenu(String( "0"));

    } else if (selectedOpt === "6") {

        let requestToClose: string = ""
        let selectedRole: string = ""

        if (userRequests.length === 0) {

            console.log("")
            console.log(`   ${chalk.bold.yellowBright("Obecnie nie ma żadnych zgłoszeń")}`)
            await backToMainMenu(String( "0"));

        }else{

            userRequests.forEach(item => {

                console.log("");
                console.log(`   ID Zgłoszenia: ${chalk.bold.blackBright(`${chalk.yellowBright(item.id)}`)},`);
                console.log(`   Data utworzenia: ${chalk.bold.blackBright(`${chalk.yellowBright(item.date)}`)},`);
                console.log(`   Zgłaszający: ${chalk.bold.blackBright(`${chalk.yellowBright(item.name)}`)},`);
                console.log(`   Opis: ${chalk.bold.blackBright(`${chalk.yellowBright(item.content)}`)},`);
                console.log(`   Status: ${chalk.bold.blackBright(`${chalk.yellowBright(item.status)}`)},`);
                console.log("");

            })

            adminAccountResponse = await askQuestion(ticketAction);
            await validValue(adminAccountResponse);
            const ticketResponse: string = adminAccountResponse;

            if(ticketResponse === "1"){

                adminAccountResponse = await askQuestion("\n   Podaj ID zgłoszenia: ");
                await validValue(adminAccountResponse);
                await quantityValidator(adminAccountResponse);

                let ticketSender: string = ""

                userRequests.forEach(item => {
                    if(adminAccountResponse === item.id){
                        requestToClose = item.id
                        ticketSender = item.name;
                    }
                })

                adminAccountResponse = await askQuestion(addRoleToNewUser);
                await validValue(adminAccountResponse);

                switch (adminAccountResponse) {
                    case "1":
                        selectedRole = roles[0];
                        break;
                    case "2":
                        selectedRole = roles[1];
                        break;
                    case "3":
                        selectedRole = roles[2];
                        break;
                    default:

                }

                users.forEach(user => {
                    if(ticketSender === user.email){
                        user.role = selectedRole
                        return;
                    }
                })

                userRequests.forEach(item => {
                    if(item.id === requestToClose){
                        item.status = `Closed [ ${moment().format('DD-MM-YYYY HH:mm:ss')} ]`;
                    }
                })

                console.log("")
                console.log(`   ${chalk.blueBright(`Rola użytkownika: ${chalk.blueBright(`${ticketSender}`)} została zmieniona na: ${chalk.blueBright(`${selectedRole}`)}`)}`)
                await backToMainMenu(String( "0"));

            }else if(ticketResponse === "2"){

                await backToMainMenu(String( "0"));

            }else{
                console.log("")
                console.log(`   ${chalk.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")}`)
                await backToMainMenu(String( "0"));
            }

        }

    } else if(selectedOpt === "0"){

        await backToMainMenu(String( "0"));

    }else{

        console.log("")
        console.log(`   ${chalk.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")}`)
        await backToMainMenu(String( "0"));

    }


}

const handlePatientMenu = async (selectedOpt) => {

    let patientResponseMenu: string = ""
    const tempArrPatient: string[] = [];
    const tempArrHelper: string[] = [];
    let foundPersonalID: boolean = false;

    if (selectedOpt === "1") {

        await validRole();

        patientResponseMenu = await askQuestion("\n   1.) Podaj imię i nazwisko pacjenta: ");
        await validValue(patientResponseMenu);
        await quantityValidator(patientResponseMenu);
        tempArrPatient.push(patientResponseMenu);


        patientResponseMenu = await askQuestion("\n   2.) Pesel: ");
        await validValue(patientResponseMenu);
        await personalIDValidator(patientResponseMenu);

        patients.forEach(patient => {
            if(patient.personalID === patientResponseMenu){
                console.log(`\n   ${chalk.redBright("Pacjent o podanym numerze pesel już istnieje w bazie")}`);
                foundPersonalID = true;
            }
        })

        if(foundPersonalID){
            foundPersonalID = false;
            await backToMainMenu(String( "0"));
        }

        tempArrPatient.push(patientResponseMenu);


        patientResponseMenu = await askQuestion(selectGender);
        await validValue(patientResponseMenu);

        if(patientResponseMenu === "1"){
            tempArrPatient.push("Kobieta");
        }else if(patientResponseMenu === "2"){
            tempArrPatient.push("Mężczyzna");
        }else if(patientResponseMenu === "2"){
            tempArrPatient.push("Inna");
        }else{
            tempArrPatient.push("Inna");
        }


        patientResponseMenu = await askQuestion("\n   4.) Pełna nazwa ulicy [dodaj przedrostek] : ");
        await validValue(patientResponseMenu);
        await quantityValidator(patientResponseMenu);
        tempArrHelper.push(patientResponseMenu);

        patientResponseMenu = await askQuestion("\n   5.) Numer [domu, budynku, bloku] : ");
        await validValue(patientResponseMenu);
        tempArrHelper.push(patientResponseMenu);

        patientResponseMenu = await askQuestion("\n   6.) Numer lokalu [wpisz: brak jeżeli nie ma] : ");
        tempArrHelper.push(patientResponseMenu);

        if(tempArrHelper[2] === undefined || tempArrHelper[2] === null || tempArrHelper[2] === "" || tempArrHelper[2].length === 0 || tempArrHelper[2] === "brak"){
            tempArrHelper.pop()
        }

        if (tempArrHelper.length === 2){
            tempArrPatient.push(`${tempArrHelper[0]} ${tempArrHelper[1]}`);
        }else if (tempArrHelper.length === 3) {
            tempArrPatient.push(`${tempArrHelper[0]} ${tempArrHelper[1]}/${tempArrHelper[2]}`);
        }
        tempArrHelper.splice(0, tempArrHelper.length);


        patientResponseMenu = await askQuestion("\n   7.) Kod pocztowy [00-000] : ");
        await validValue(patientResponseMenu);
        await quantityValidator(patientResponseMenu);
        tempArrHelper.push(patientResponseMenu);

        patientResponseMenu = await askQuestion("\n   8.) Nazwa miejscowości: ");
        await validValue(patientResponseMenu);
        tempArrHelper.push(patientResponseMenu);
        tempArrPatient.push(`${tempArrHelper[0]}, ${tempArrHelper[1]}`);
        tempArrHelper.splice(0, tempArrHelper.length);


        patientResponseMenu = await askQuestion("\n   9.) Numer telefonu komórkowego [bez spacji] [wpisz: brak jeżeli nie ma] : ");
        await validValue(patientResponseMenu);

        if(patientResponseMenu.toLowerCase().toString() === "brak" ||
            patientResponseMenu.toLowerCase().toString() === "br" ||
            patientResponseMenu.toLowerCase().toString() === "b.r" ||
            patientResponseMenu.toLowerCase().toString() === "b.r.k" ||
            patientResponseMenu.toLowerCase().toString() === "brk" ||
            patientResponseMenu.toLowerCase().toString() === "b"
        ){
            tempArrPatient.push(patientResponseMenu = "brak");
        }else{

            patientResponseMenu.replace(/\s+/g, " ");
            tempArrPatient.push(`+48 ${patientResponseMenu.replace(/(.{3})/g, "$1-").slice(0, -1)}`);
        }


        patientResponseMenu = await askQuestion("\n   10.) adres email [wpisz: brak jeżeli nie ma] : ");
        await validValue(patientResponseMenu);
        tempArrPatient.push(patientResponseMenu);


        patientResponseMenu = await askQuestion("\n   11.) Podaj numer karty pacjenta [wpisz brak jeżeli nie ma] : ");
        await validValue(patientResponseMenu);
        await quantityValidator(patientResponseMenu);
        tempArrPatient.push(patientResponseMenu);


        const newPatient: Patient = {
            id: uuid(),
            name: tempArrPatient[0],
            personalID: tempArrPatient[1],
            gender: tempArrPatient[2],
            address: tempArrPatient[3],
            city: tempArrPatient[4],
            phoneNumber: tempArrPatient[5],
            email: tempArrPatient[6],
            cardNumber: tempArrPatient[7],
            createdAt: moment().format('DD-MM-YYYY HH:mm:ss'),
        }

        patients.push(newPatient);

        console.log("");
        console.log(`   ${chalk.blueBright("########################################################")}`);
        console.log(`   ${chalk.blueBright("########################################################")}\n`);
        console.log(`   Pacjent: ${chalk.blueBright(newPatient.name)}, został pomyślnie dodany do bazy.`);
        await backToMainMenu(String( "0"));

    } else if (selectedOpt === "2") {

        await validRole();

        patientResponseMenu = await askQuestion("\n   Podaj pesel pacjenta: ");
        await validValue(patientResponseMenu);
        await personalIDValidator(patientResponseMenu);
        const givenPatientID: string = patientResponseMenu;

        let foundPatient: Patient = null;

            patients.forEach(patient => {
                if(patientResponseMenu === patient.personalID){
                    return foundPatient = patient;
                }
            })


        patientResponseMenu = await askQuestion(editMany);
        await validValue(patientResponseMenu);
        if(patientResponseMenu === "0"){

            await backToMainMenu(String( "0"));

        }else if(patientResponseMenu === "1"){

            patientResponseMenu = await askQuestion(patientToEditPattern);
            await validValue(patientResponseMenu);

            switch (patientResponseMenu){

                case "1":

                    patientResponseMenu = await askQuestion("\n   1.) Wprowadź nowe imię i nazwisko Pacjenta: ");
                    await validValue(patientResponseMenu);
                    await quantityValidator(patientResponseMenu);
                    foundPatient.name = patientResponseMenu;
                    break;

                case "2":

                    patientResponseMenu = await askQuestion("\n   2.) Wprowadź nowy numer pesel: ");
                    await validValue(patientResponseMenu);
                    await personalIDValidator(patientResponseMenu);

                    patients.forEach(patient => {
                        if(patient.personalID === patientResponseMenu){
                            console.log(`\n   ${chalk.redBright("Pacjent o podanym numerze pesel już istnieje w bazie.")}`);
                            foundPersonalID = true
                        }
                    })

                    if(foundPersonalID){
                        foundPersonalID = false;
                        await backToMainMenu(String( "0"));
                    }


                    foundPatient.personalID = patientResponseMenu;
                    break;

                case "3":

                    patientResponseMenu = await askQuestion(selectGender);
                    await validValue(patientResponseMenu);

                    if(patientResponseMenu === "1"){
                        foundPatient.gender = "Kobieta";
                    }else if(patientResponseMenu === "2"){
                        foundPatient.gender = "Mężczyzna";
                    }else if (patientResponseMenu === "3"){
                        foundPatient.gender = "Inna";
                    }else{
                        foundPatient.gender = "Inna";
                    }
                    break;

                case "4":

                    const tempAdr: string[] = [];

                    patientResponseMenu = await askQuestion("\n   4.) Wprowadź nową nazwę ulicy [dodaj przedrostek] : ");
                    await validValue(patientResponseMenu);
                    await quantityValidator(patientResponseMenu);
                    tempAdr.push(patientResponseMenu);

                    patientResponseMenu = await askQuestion("\n   5.) Wprowadź nowy numer: [domu, budynku, bloku] : ");
                    await validValue(patientResponseMenu);
                    tempAdr.push(patientResponseMenu);

                    patientResponseMenu = await askQuestion("\n   6.) Wprowadź nowy numer lokalu [jeżeli nie dotyczy wciśnij enter] : ");
                    tempAdr.push(patientResponseMenu);

                    if(tempAdr[2] === undefined || tempAdr[2] === null || tempAdr[2] === "" || tempAdr[2].length === 0){
                        tempAdr.pop()
                    }

                    if (tempAdr.length === 2){
                        foundPatient.address = `${tempAdr[0]} ${tempAdr[1]}`
                    }else if (tempAdr.length === 3) {
                        foundPatient.address = `${tempAdr[0]} ${tempAdr[1]}/${tempAdr[2]}`
                    }
                    tempAdr.splice(0, tempAdr.length);
                    break;

                case "5":

                    const tempAdr1: string[] = [];

                    patientResponseMenu = await askQuestion("\n   7.) Wprowadź nowy kod pocztowy [ 00-000 ] : ");
                    await validValue(patientResponseMenu);
                    await quantityValidator(patientResponseMenu);
                    tempAdr1.push(patientResponseMenu);

                    patientResponseMenu = await askQuestion("\n   8.) Wprowadź nową nazwę miejscowości: ");
                    await validValue(patientResponseMenu);
                    await quantityValidator(patientResponseMenu);
                    tempAdr1.push(patientResponseMenu);

                    foundPatient.city = `${tempAdr1[0]}, ${tempAdr1[1]}`;
                    tempAdr1.splice(0, tempAdr1.length);
                    break;

                case "6":

                    if(foundPatient.phoneNumber === "brak") {
                        patientResponseMenu = await askQuestion("\n   9.) Dodaj numer telefonu: ");
                        await validValue(patientResponseMenu);
                        patientResponseMenu;
                        patientResponseMenu.replace(/\s+/g, " ");
                        foundPatient.phoneNumber = `+48 ${patientResponseMenu.replace(/(.{3})/g, "$1-").slice(0, -1)}`;
                    }else{
                        patientResponseMenu = await askQuestion("\n   9.) Wprowadź nowy numer telefonu komórkowego: ");
                        await validValue(patientResponseMenu);
                        patientResponseMenu;
                        await quantityValidator(patientResponseMenu);
                        patientResponseMenu.replace(/\s+/g, " ");
                        foundPatient.phoneNumber = `+48 ${patientResponseMenu.replace(/(.{3})/g, "$1-").slice(0, -1)}`;
                    }
                    break;

                case "7":

                    if (foundPatient.email === "brak") {
                        patientResponseMenu = await askQuestion("\n   10.) Dodaj adres email: ");
                        await validValue(patientResponseMenu);
                        foundPatient.email = String(patientResponseMenu);
                    }else{
                        patientResponseMenu = await askQuestion("\n   11.) Wprowadź nowy adres email: ");
                        await validValue(patientResponseMenu);
                        foundPatient.email = String(patientResponseMenu);
                    }
                    break;

                case "8":

                    if(foundPatient.cardNumber === "brak"){
                        patientResponseMenu = await askQuestion("\n  12.) Uzupełnij numer karty: ");
                        await validValue(patientResponseMenu);
                        await quantityValidator(patientResponseMenu);
                        foundPatient.cardNumber = String(patientResponseMenu);
                    }else{
                        patientResponseMenu = await askQuestion("\n  13.) Wprowadź nowy numer karty: ");
                        await validValue(patientResponseMenu);
                        await quantityValidator(patientResponseMenu);
                        foundPatient.cardNumber = String(patientResponseMenu);
                    }

                    break;

                default:
                    console.log("")
                    console.log(`   ${chalk.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")}`)
                    await backToMainMenu(String( "0"));
                    break;
            }

            patients.forEach(patient => {
                if(givenPatientID === patient.personalID){
                    patient.name = foundPatient.name;
                    patient.personalID = foundPatient.personalID;
                    patient.gender = foundPatient.gender;
                    patient.address = foundPatient.address;
                    patient.city = foundPatient.city;
                    patient.phoneNumber = foundPatient.phoneNumber;
                    patient.email = foundPatient.email;
                    patient.cardNumber = foundPatient.cardNumber;
                }
            })

            console.log("");
            console.log(`   ${chalk.blueBright("########################################################")}`);
            console.log(`   ${chalk.blueBright("########################################################")}\n`);
            console.log(`   Dane Pacjenta o numerze pesel: ${chalk.blueBright(foundPatient.personalID)}, zostały pomyślnie zaktualizowane.`);
            await backToMainMenu(String( "0"));

        }else if(patientResponseMenu === "2"){

            const tempArrPatientEdit: string[] = [];
            const tempArrHelperEdit: string[] = [];

            patientResponseMenu = await askQuestion("\n   1.) Podaj imię i nazwisko pacjenta: ");
            await validValue(patientResponseMenu);
            await quantityValidator(patientResponseMenu);
            tempArrPatientEdit.push(patientResponseMenu);

            patientResponseMenu = await askQuestion("\n   2.) Pesel: ");
            await validValue(patientResponseMenu);
            await personalIDValidator(patientResponseMenu);

            patients.forEach(patient => {
                if(patient.personalID === patientResponseMenu){
                    console.log(`\n   ${chalk.redBright("Pacjent o podanym numerze pesel już istnieje w bazie.")}`);
                    foundPersonalID = true
                }
            })

            if(foundPersonalID){
                foundPersonalID = false;
                await backToMainMenu(String( "0"));
            }

            tempArrPatientEdit.push(patientResponseMenu);

            patientResponseMenu = await askQuestion(selectGender);
            await validValue(patientResponseMenu);

            if(patientResponseMenu === "1"){
                tempArrPatientEdit.push("Kobieta");
            }else if(patientResponseMenu === "2"){
                tempArrPatientEdit.push("Mężczyzna");
            }else if(patientResponseMenu === "2"){
                tempArrPatientEdit.push("Inna");
            }else{
                tempArrPatientEdit.push("Inna");
            }

            patientResponseMenu = await askQuestion("\n   4.) Pełna nazwa ulicy [dodaj przedrostek] : ");
            await validValue(patientResponseMenu);
            await quantityValidator(patientResponseMenu);
            tempArrHelperEdit.push(patientResponseMenu);

            patientResponseMenu = await askQuestion("\n   5.) Numer [domu, budynku, bloku] : ");
            await validValue(patientResponseMenu);
            tempArrHelperEdit.push(patientResponseMenu);

            patientResponseMenu = await askQuestion("\n   6.) Numer lokalu [jeżeli nie dotyczy wciśnij enter] : ");
            await validValue(patientResponseMenu);
            tempArrHelperEdit.push(patientResponseMenu);

            if(tempArrHelperEdit[2] === undefined || tempArrHelperEdit[2] === null || tempArrHelperEdit[2] === "" || tempArrHelperEdit[2].length === 0){
                tempArrHelperEdit.pop()
            }

            if (tempArrHelperEdit.length === 2){
                tempArrPatientEdit.push(`${tempArrHelperEdit[0]} ${tempArrHelperEdit[1]}`);
            }else if (tempArrHelperEdit.length === 3) {
                tempArrPatientEdit.push(`${tempArrHelperEdit[0]} ${tempArrHelperEdit[1]}/${tempArrHelperEdit[2]}`);
            }
            tempArrHelperEdit.splice(0, tempArrHelperEdit.length);

            patientResponseMenu = await askQuestion("\n   7.) Kod pocztowy [00-000] : ");
            await validValue(patientResponseMenu);
            await quantityValidator(patientResponseMenu);
            tempArrHelperEdit.push(patientResponseMenu);

            patientResponseMenu = await askQuestion("\n   8.) Nazwa miejscowości: ");
            await validValue(patientResponseMenu);
            await quantityValidator(patientResponseMenu);
            tempArrHelperEdit.push(patientResponseMenu);
            tempArrPatientEdit.push(`${tempArrHelperEdit[0]}, ${tempArrHelperEdit[1]}`);
            tempArrHelperEdit.splice(0, tempArrHelperEdit.length);

            patientResponseMenu = await askQuestion("\n   9.) Numer telefonu [bez spacji] [wpisz: brak jeżeli nie ma] : ");
            await validValue(patientResponseMenu);
            patientResponseMenu;
            await quantityValidator(patientResponseMenu);
            patientResponseMenu.replace(/\s+/g, " ");
            tempArrPatientEdit.push(`+48 ${patientResponseMenu.replace(/(.{3})/g, "$1-").slice(0, -1)}`);

            patientResponseMenu = await askQuestion("\n   10.) adres email [wpisz: brak jeżeli niema] : ");
            await validValue(patientResponseMenu);
            tempArrPatientEdit.push(patientResponseMenu);

            patientResponseMenu = await askQuestion("\n   11.) Podaj numer karty pacjenta [wpisz brak jeżeli nie ma] : ");
            await validValue(patientResponseMenu);
            if(patientResponseMenu.toLowerCase().toString() === "brak" ||
                patientResponseMenu.toLowerCase().toString() === "br" ||
                patientResponseMenu.toLowerCase().toString() === "b.r" ||
                patientResponseMenu.toLowerCase().toString() === "b.r.k" ||
                patientResponseMenu.toLowerCase().toString() === "brk" ||
                patientResponseMenu.toLowerCase().toString() === "b"
            ) {
                patientResponseMenu = "brak";
            }

            tempArrPatientEdit.push(patientResponseMenu);

            patients.forEach(patient => {
                if(givenPatientID === patient.personalID){
                    patient.name = tempArrPatientEdit[0];
                    patient.personalID = tempArrPatientEdit[1];
                    patient.gender = tempArrPatientEdit[2];
                    patient.address = tempArrPatientEdit[3];
                    patient.city = tempArrPatientEdit[4];
                    patient.phoneNumber = tempArrPatientEdit[5];
                    patient.email = tempArrPatientEdit[6];
                    patient.cardNumber = tempArrPatientEdit[7];
                }
            })

            tempArrPatientEdit.splice(0, tempArrPatientEdit.length);

            console.log("");
            console.log(`   ${chalk.blueBright("########################################################")}`);
            console.log(`   ${chalk.blueBright("########################################################")}\n`);
            console.log(`   Dane Pacjenta o numerze pesel: ${chalk.blueBright(foundPatient.personalID)}, zostały pomyślnie zaktualizowane.`);
            await backToMainMenu(String( "0"));

        }else{

            console.log("")
            console.log(`   ${chalk.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")}`)
            await backToMainMenu(String("0"));

        }


    } else if (selectedOpt === "3") {

        if(clinics.length === 0){
            console.log("")
            console.log(`   ${chalk.yellowBright("Aktualnie w bazie danych, niema zapisanych obiektów medycznych. Dodaj obiekt aby wykonać tą operację.")}`)
            await backToMainMenu(String("0"));
        }

        patientResponseMenu = await askQuestion("\n   Podaj pesel pacjenta: ");
        await validValue(patientResponseMenu);
        await personalIDValidator(patientResponseMenu);

        clinics?.forEach((clinic) => {
            const propertyPatients = clinic.patients;
            if (propertyPatients.length > 0) {
                propertyPatients.forEach((patient) => {
                    if (patient.personalID === patientResponseMenu){

                        console.log("");
                        console.log(`   ${chalk.blackBright("dbID: ")} ${chalk.yellowBright(clinic.id)},`);
                        console.log(`   ${chalk.blackBright("Nazwa placówki: ")} ${chalk.greenBright(clinic.name)},`);
                        console.log(`   ${chalk.blackBright("Adres: ")} ${chalk.greenBright(clinic.address)},`);
                        console.log(`   ${chalk.blackBright("Kod pocztowy i miasto: ")} ${chalk.greenBright(clinic.city)},`);
                        console.log(`   ${chalk.blackBright("Typ placówki: ")} ${chalk.greenBright(clinic.type)},`);
                        console.log("");

                    }
                });
            }
        });

        console.log("");
        await backToMainMenu(String( "0"));


    } else if (selectedOpt === "4") {

        await validRole();

        patientResponseMenu = await askQuestion("\n   Podaj pesel pacjenta: ");
        await validValue(patientResponseMenu);
        await personalIDValidator(patientResponseMenu);

        patients.forEach(patient => {
            if (patientResponseMenu === patient.personalID) {

                console.log("");
                console.log(`   ${chalk.blackBright("dbID: ")} ${chalk.yellowBright(patient.id)},`);
                console.log(`   ${chalk.blackBright("Imię i nazwisko: ")} ${chalk.greenBright(patient.name)},`);
                console.log(`   ${chalk.blackBright("Pesel: ")} ${chalk.greenBright(patient.personalID)},`);
                console.log(`   ${chalk.blackBright("Płeć: ")} ${chalk.greenBright(patient.gender)},`);
                console.log(`   ${chalk.blackBright("Adres: ")} ${chalk.greenBright(patient.address)},`);
                console.log(`   ${chalk.blackBright("Kod pocztowy i miasto: ")} ${chalk.greenBright(patient.city)},`);
                console.log(`   ${chalk.blackBright("Numer telefonu: ")} ${chalk.greenBright(patient.phoneNumber)},`);
                console.log(`   ${chalk.blackBright("Adres email: ")} ${chalk.greenBright(patient.email)},`);
                console.log(`   ${chalk.blackBright("Numer karty pacjenta: ")} ${chalk.greenBright(patient.cardNumber)},`);
                console.log(`   ${chalk.blackBright("Data utworzenia konta: ")} ${chalk.greenBright(patient.createdAt)},`);

            }
        })

        console.log("");
        await backToMainMenu(String("0"));

    }else if(selectedOpt === "5") {

        await validRole();

        patients.forEach(patient => {

            console.log("");
            console.log(`   ${chalk.blackBright("dbID: ")} ${chalk.yellowBright(patient.id)},`);
            console.log(`   ${chalk.blackBright("Imię i nazwisko: ")} ${chalk.greenBright(patient.name)},`);
            console.log(`   ${chalk.blackBright("Pesel: ")} ${chalk.greenBright(patient.personalID)},`);
            console.log(`   ${chalk.blackBright("Płeć: ")} ${chalk.greenBright(patient.gender)},`);
            console.log(`   ${chalk.blackBright("Adres: ")} ${chalk.greenBright(patient.address)},`);
            console.log(`   ${chalk.blackBright("Kod pocztowy i miasto: ")} ${chalk.greenBright(patient.city)},`);
            console.log(`   ${chalk.blackBright("Numer telefonu: ")} ${chalk.greenBright(patient.phoneNumber)},`);
            console.log(`   ${chalk.blackBright("Adres email: ")} ${chalk.greenBright(patient.email)},`);
            console.log(`   ${chalk.blackBright("Numer karty pacjenta: ")} ${chalk.greenBright(patient.cardNumber)},`);
            console.log(`   ${chalk.blackBright("Data utworzenia konta: ")} ${chalk.greenBright(patient.createdAt)},`);
            console.log(`\n   ${chalk.bold.magentaBright("##############################")}\n`);

        })

        console.log("");
        await backToMainMenu(String("0"));

    } else if (selectedOpt === "6") {

        await validRole();

        const tempArrTransfer: string[] = [];

        patientResponseMenu = await askQuestion("\n   Podaj pesel pacjenta: ");
        await validValue(patientResponseMenu);
        await personalIDValidator(patientResponseMenu);
        tempArrTransfer.push(patientResponseMenu);

        patientResponseMenu = await askQuestion("\n   Podaj nazwę placówki: ");
        await validValue(patientResponseMenu);
        await quantityValidator(patientResponseMenu);
        tempArrTransfer.push(patientResponseMenu);


        clinics.forEach(clinic => {
            if (clinic.name === tempArrTransfer[1]){
                patients.forEach(patient => {
                    if(patient.personalID === tempArrTransfer[0]){
                        clinic.patients.push(patient);
                    }
                })
            }
        })

        console.log("");
        console.log(`   Pacjent o numerze pesel: ${chalk.blueBright(tempArrTransfer[0])}, został pomyślnie dodany do ${chalk.blueBright(tempArrTransfer[1])}.`);
        await backToMainMenu(String( "0"));

    } else if (selectedOpt === "7") {

        await validRole();

        const tempArrPatient: string[] | null = [];
        let patientToTransfer: Patient | null = null;
        let lastClinic: string = ""

        if(clinics.length === 0){
            console.log("")
            console.log(`   ${chalk.yellowBright("Aktualnie w bazie danych, niema zapisanych obiektów medycznych. Dodaj obiekt aby wykonać tą operację.")}`)
            await backToMainMenu(String("0"));
        }

        patientResponseMenu = await askQuestion("\n   Podaj pesel pacjenta: ");
        await validValue(patientResponseMenu);
        await personalIDValidator(patientResponseMenu);
        tempArrPatient.push(patientResponseMenu);

        patientResponseMenu = await askQuestion("\n   Podaj nazwę placówki do której chcesz przenieść pacjenta: ");
        await validValue(patientResponseMenu);
        await quantityValidator(patientResponseMenu);

        clinics?.forEach((clinic) => {
            const propertyPatients = clinic.patients;

            if (propertyPatients && propertyPatients.length > 0) {
                propertyPatients.forEach((patient, index) => {
                    if (patient.personalID === tempArrPatient[0]){
                        lastClinic = clinic.name;
                        patientToTransfer = patient;
                        propertyPatients.splice(index, 1);
                    }
                });
            }
        });


        clinics?.forEach((clinic) => {

            if(patientResponseMenu === clinic.name){
                clinic.patients?.push(patientToTransfer);
            }

        })

        console.log("");
        console.log(`   Pacjent: ${chalk.blueBright(patientToTransfer.name)}, został przeniesiony pomyślnie do: ${chalk.blueBright(patientResponseMenu)}\n`);
        console.log(`   Dane pacjenta z obiektu: ${chalk.blueBright(lastClinic)} zostały pomyślnie usunięte.`);
        patientToTransfer = null;
        tempArrPatient.slice(0, tempArrPatient.length);
        await backToMainMenu(String( "0"));

    }else if (selectedOpt === "8") {

        await validRole();

        let patientToRemove: string = "";
        let patientID: string = "";

        patientResponseMenu = await askQuestion("\n   Podaj pesel pacjenta: ");
        await validValue(patientResponseMenu);
        await personalIDValidator(patientResponseMenu);

        patients.filter(item => {
            if (patientResponseMenu === item.personalID) {
                patientID = item.id
                patientToRemove = item.address
                return;
            }
        })


        patientResponseMenu = await askQuestion(chalk.redBright(`\n   Przepisz adres pacjenta w celu usunięcia go z bazy\n   [ ${chalk.cyanBright(`${patientToRemove}`)} ]: `));
        await validValue(patientResponseMenu);


        if (patientResponseMenu === patientToRemove) {

            const index = patients.findIndex(item => item.id === patientID);

            if (index !== -1) {
                patients.splice(index, 1);
            }

            console.log("")
            console.log(`   ${chalk.bold.bgRed("Pacjent został pomyślnie usunięty.\n")}`)
            await backToMainMenu(String("0"));


        } else if (patientResponseMenu !== patientToRemove) {

            console.log("");
            console.log(`   ${chalk.redBright("Podana wartość jest nie prawidłowa. Pacjent nie został usunięty.")}`);
            await backToMainMenu(String( "0"));

        }


    }else if(selectedOpt === "0"){

        return await backToMainMenu(String( "0"));

    } else {
        console.log("")
        console.log(`   ${chalk.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")}`)
        await backToMainMenu(String("0"));
    }

}

const handleClinicMenu = async selectedOpt => {

    let clinicResponseMenu: string = "";
    const tempArrClinic: string[] = [];
    const tempAdr1: string[] = [];


    if (selectedOpt === "1") {

        await validRole();

        clinicResponseMenu = await askQuestion("\n   1.) Podaj nazwę placówki: ");
        await validValue(clinicResponseMenu);
        await quantityValidator(clinicResponseMenu);
        tempArrClinic.push(clinicResponseMenu);

        clinicResponseMenu = await askQuestion("\n   2.) Wprowadź nazwę ulicy bez numeru [dodaj przedrostek] : ");
        await validValue(clinicResponseMenu);
        await quantityValidator(clinicResponseMenu);
        tempAdr1.push(clinicResponseMenu);

        clinicResponseMenu = await askQuestion("\n   3.) Wprowadź numer: [domu, budynku, bloku] : ");
        await validValue(clinicResponseMenu);
        tempAdr1.push(clinicResponseMenu);

        clinicResponseMenu = await askQuestion("\n   4.) Wprowadź numer lokalu [jeżeli nie dotyczy wciśnij enter] : ");
        tempAdr1.push(clinicResponseMenu);

        if(tempAdr1[2] === undefined || tempAdr1[2] === null || tempAdr1[2] === "" || tempAdr1[2].length === 0){
            tempAdr1.pop()
        }
        if (tempAdr1.length === 2){
            tempArrClinic.push(`${tempAdr1[0]} ${tempAdr1[1]}`)
        }else if (tempAdr1.length === 3) {
            tempArrClinic.push(`${tempAdr1[0]} ${tempAdr1[1]}/${tempAdr1[2]}`)
        }
        tempAdr1.splice(0, tempAdr1.length);

        clinicResponseMenu = await askQuestion("\n   5.) Wprowadź kod pocztowy [00-000] : ");
        await validValue(clinicResponseMenu);
        await quantityValidator(clinicResponseMenu);
        tempAdr1.push(clinicResponseMenu);

        clinicResponseMenu = await askQuestion("\n   6.) Wprowadź nazwę miejscowości: ");
        await validValue(clinicResponseMenu);
        await quantityValidator(clinicResponseMenu);
        tempAdr1.push(clinicResponseMenu);
        tempArrClinic.push(`${tempAdr1[0]}, ${tempAdr1[1]}`);
        tempAdr1.splice(0, tempAdr1.length);

        clinicResponseMenu = await askQuestion(clinicMenuType);
        await validValue(clinicResponseMenu);

        if(clinicResponseMenu === "1") {
            tempArrClinic.push(clinicType[0]);
        }else if(clinicResponseMenu === "2"){
            tempArrClinic.push(clinicType[1]);
        }else if(clinicResponseMenu === "3"){
            tempArrClinic.push(clinicType[2]);
        }else{
            console.log("")
            console.log(`   ${chalk.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")}`)
            await backToMainMenu(String("0"));
        }
        tempAdr1.splice(0, tempAdr1.length);

        const newClinic: Clinic = {

            id: uuid(),
            name: tempArrClinic[0],
            address: tempArrClinic[1],
            city: tempArrClinic[2],
            type: tempArrClinic[3],
            patients: [],

        }

        clinics.push(newClinic)

        clinicResponseMenu = await askQuestion(addPatientToClinicMenu);
        await validValue(clinicResponseMenu);

        if(clinicResponseMenu === "1"){

            console.log("");
            console.log(`   ${chalk.blueBright("########################################################")}`);
            console.log(`   ${chalk.blueBright("########################################################")}\n`);
            console.log(`   Obiekt o nazwie: ${chalk.blueBright(tempArrClinic[0])}, został pomyślnie dodany do bazy.`);
            await backToMainMenu(String( "0"));


        }

        else if(clinicResponseMenu === "2"){

            if(clinics.length === 0){
                console.log("")
                console.log(`   ${chalk.redBright("W bazie danych nie ma aktualnie żadnej kliniki. Dodaj klinikę aby skorzystać z tej opcji")}`)
                await backToMainMenu(String("0"));
            }

            clinicResponseMenu = await askQuestion("\n   Wprowadź numery pesel oddzielając je przecinkiem [ 12345678,12345678,12345678... ]: ");
            await validValue(clinicResponseMenu);
            await personalIDValidator(clinicResponseMenu);

            const peselString: string = clinicResponseMenu;
            const peselsArray: string[] | null = [];
            const peselsFound: string[] = [];

            for (const pesel of peselString.split(',')) {
                peselsArray.push(pesel);
            }

            console.log()

            const clearNumbersArr = new Set(peselsArray);
            const newPersonalIDArray = Array.from(clearNumbersArr);

            newPersonalIDArray.forEach(pesel => {
                patients.forEach(patient => {

                    if (patient.personalID === pesel) {

                        clinics.forEach(clinic => {
                            if(clinic.name === tempArrClinic[0]){
                                peselsFound.push(pesel);
                                clinic.patients.push(patient);
                            }
                        })

                    }

                })
            })

            const notFoundNumbers = newPersonalIDArray.filter(item => !peselsFound.includes(item));

            if(notFoundNumbers.length !== 0){
                console.log(`\n   ${chalk.bold.magentaBright("#########################\n")}`);
                console.log(`   Lista nieznalezionych numerów pesel:\n`);
                notFoundNumbers.forEach(item => {
                    console.log(`   ${item},`);
                })
                console.log(`\n   ${chalk.bold.magentaBright("#########################\n")}`);
            }

            console.log("");
            console.log(`   Obiekt o nazwie: ${chalk.blueBright(tempArrClinic[0])}, wraz z pacjentami, został pomyślnie dodany do bazy.`);
            await backToMainMenu(String( "0"));


        }else if (clinicResponseMenu === "3"){

            if(clinics.length === 0){
                console.log("")
                console.log(`   ${chalk.redBright("W bazie danych nie ma aktualnie żadnej kliniki. Dodaj klinikę aby skorzystać z tej opcji")}`)
                await backToMainMenu(String("0"));
            }

            clinicResponseMenu = await askQuestion("\n   Wprowadź nazwę placówki: ");
            await validValue(clinicResponseMenu);
            await quantityValidator(clinicResponseMenu);
            tempAdr1.push(clinicResponseMenu)

            clinicResponseMenu = await askQuestion("\n   Wprowadź pesel pacjenta: ");
            await validValue(clinicResponseMenu);
            await personalIDValidator(clinicResponseMenu);
            tempAdr1.push(clinicResponseMenu)

            clinics?.forEach((clinic) => {

                if(clinic.name === tempAdr1[0]){

                    patients.forEach(patient => {

                        if(patient.personalID === tempAdr1[1]){
                            clinic.patients?.push(patient);
                        }

                    })

                }

            });

            console.log("");
            console.log(`   ${chalk.blueBright("########################################################")}`);
            console.log(`   ${chalk.blueBright("########################################################")}\n`);
            console.log(`   Obiekt o nazwie: ${chalk.blueBright(tempArrClinic[0])}, wraz z pacjentem, został pomyślnie dodany do bazy.`);
            await backToMainMenu(String( "0"));

        }else{

            console.log("")
            console.log(`   ${chalk.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")}`)
            await backToMainMenu(String("0"));

        }



    }else if (selectedOpt === "2") {

        await validRole();

        let propertyName: string = ""
        const tempArrClinic1: string[] = [];
        const tempAdr22: string[] = [];

        clinicResponseMenu = await askQuestion("\n   Wprowadź nazwę placówki: ");
        await validValue(clinicResponseMenu);
        await quantityValidator(clinicResponseMenu);
        tempArrClinic1.push(clinicResponseMenu);

        clinicResponseMenu = await askQuestion(editMany);
        await validValue(clinicResponseMenu);

        if (clinicResponseMenu === "1") {

            clinicResponseMenu = await askQuestion(editMenuClinic);
            await validValue(clinicResponseMenu);

            switch(clinicResponseMenu) {

                case "1":

                    propertyName = "Nazwa placówki";
                    clinicResponseMenu = await askQuestion("\n   Wprowadź nową nazwę placówki: ");
                    await validValue(clinicResponseMenu);
                    await quantityValidator(clinicResponseMenu);
                    clinics.forEach(clinic => {
                        if(clinic.name === tempArrClinic1[0]){
                            clinic.name = clinicResponseMenu
                            return;
                        }
                    })

                break;
                case "2":

                    propertyName = "Adres";
                    clinicResponseMenu = await askQuestion("\n   Wprowadź nazwę ulicy bez numeru [dodaj przedrostek] : ");
                    await validValue(clinicResponseMenu);
                    await quantityValidator(clinicResponseMenu);
                    tempAdr22.push(clinicResponseMenu);
                    clinicResponseMenu = await askQuestion("\n   Wprowadź numer: [domu, budynku, bloku] : ");
                    await validValue(clinicResponseMenu);
                    tempAdr22.push(clinicResponseMenu);
                    clinicResponseMenu = await askQuestion("\n   Wprowadź numer lokalu [jeżeli nie dotyczy wciśnij enter] : ");
                    await validValue(clinicResponseMenu);
                    tempAdr22.push(clinicResponseMenu);

                    if(tempAdr22[2] === undefined || tempAdr22[2] === null || tempAdr22[2] === "" || tempAdr22[2].length === 0){
                        tempAdr22.pop()
                    }
                    if (tempAdr22.length === 2){

                        clinics.forEach(clinic => {
                            if(clinic.name === tempArrClinic1[0]){
                                clinic.address = `${tempAdr22[0]} ${tempAdr22[1]}`
                                return;
                            }
                        })

                    }else if (tempAdr1.length === 3) {

                        clinics.forEach(clinic => {
                            if(clinic.name === tempArrClinic1[0]){
                                clinic.address = `${tempAdr22[0]} ${tempAdr22[1]}/${tempAdr22[2]}`
                                return;
                            }
                        })

                    }

                    break;

                case "3":

                    propertyName = "Kod pocztowy i miasto";
                    clinicResponseMenu = await askQuestion("\n   Wprowadź kod pocztowy [00-000] : ");
                    await validValue(clinicResponseMenu);
                    await quantityValidator(clinicResponseMenu);
                    tempAdr22.push(clinicResponseMenu);
                    clinicResponseMenu = await askQuestion("\n   Wprowadź nazwę miejscowości: ");
                    await validValue(clinicResponseMenu);
                    await quantityValidator(clinicResponseMenu);
                    tempAdr22.push(clinicResponseMenu);

                    clinics.forEach(clinic => {
                        if(clinic.name === tempArrClinic1[0]){
                            clinic.city = `${tempAdr22[0]}, ${tempAdr22[1]}`
                            return;
                        }
                    })

                    break;
                case "4":

                    propertyName = "Typ placówki";
                    clinicResponseMenu = await askQuestion(clinicMenuType);
                    await validValue(clinicResponseMenu);

                    switch(clinicResponseMenu){

                        case "1":

                            clinics.forEach(clinic => {
                                if(clinic.name === tempArrClinic1[0]){
                                    clinic.type = clinicType[0];
                                    return;
                                }
                            })

                            break;
                        case "2":

                            clinics.forEach(clinic => {
                                if(clinic.name === tempArrClinic1[0]){
                                    clinic.type = clinicType[1];
                                    return;
                                }
                            })

                            break;

                        case "3":

                            clinics.forEach(clinic => {
                                if(clinic.name === tempArrClinic1[0]){
                                    clinic.type = clinicType[2];
                                    return;
                                }
                            })

                            break;
                        default:
                            console.log("")
                            console.log(`   ${chalk.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")}`)
                            await backToMainMenu(String("0"));

                            break;
                    }

                    break;

                default:

                    console.log("")
                    console.log(`   ${chalk.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")}`)
                    await backToMainMenu(String("0"));
                    break;

            }


            console.log("");
            console.log(`   Wartość pola ${chalk.blueBright(propertyName)} obiektu o nazwie: ${chalk.blueBright(tempArrClinic1[0])},  została pomyślnie zaktualizowana.`);
            tempAdr1.splice(0, tempAdr1.length);
            tempArrClinic1.splice(0, tempArrClinic1.length);
            await backToMainMenu(String( "0"));


        }else if(clinicResponseMenu === "2"){


            clinicResponseMenu = await askQuestion("\n   Podaj nową nazwę placówki: ");
            await validValue(clinicResponseMenu);
            await quantityValidator(clinicResponseMenu);
            tempArrClinic1.push(clinicResponseMenu);

            clinicResponseMenu = await askQuestion("\n   Wprowadź nową nazwę ulicy bez numeru [dodaj przedrostek] : ");
            await validValue(clinicResponseMenu);
            await quantityValidator(clinicResponseMenu);
            tempAdr22.push(clinicResponseMenu);

            clinicResponseMenu = await askQuestion("\n   Wprowadź nowy numer: [domu, budynku, bloku] : ");
            await validValue(clinicResponseMenu);
            tempAdr22.push(clinicResponseMenu);

            clinicResponseMenu = await askQuestion("\n   Wprowadź nowy numer lokalu [jeżeli nie dotyczy wciśnij enter] : ");
            await validValue(clinicResponseMenu);
            tempAdr22.push(clinicResponseMenu);

            if(tempAdr22[2] === undefined || tempAdr22[2] === null || tempAdr22[2] === "" || tempAdr22[2].length === 0){
                tempAdr22.pop()
            }
            if (tempAdr22.length === 2){
                tempArrClinic1.push(`${tempAdr22[0]} ${tempAdr22[1]}`)
            }else if (tempAdr22.length === 3) {
                tempArrClinic1.push(`${tempAdr22[0]} ${tempAdr22[1]}/${tempAdr22[2]}`)
            }
            tempAdr22.splice(0, tempAdr22.length);

            clinicResponseMenu = await askQuestion("\n   Wprowadź nowy kod pocztowy [00-000] : ");
            await validValue(clinicResponseMenu);
            await quantityValidator(clinicResponseMenu);
            tempAdr22.push(clinicResponseMenu);

            clinicResponseMenu = await askQuestion("\n   Wprowadź nową nazwę miejscowości: ");
            await validValue(clinicResponseMenu);
            await quantityValidator(clinicResponseMenu);
            tempAdr22.push(clinicResponseMenu);
            tempArrClinic1.push(`${tempAdr22[0]}, ${tempAdr22[1]}`);
            tempAdr22.splice(0, tempAdr22.length);

            clinicResponseMenu = await askQuestion(clinicMenuType);
            await validValue(clinicResponseMenu);

            if(clinicResponseMenu === "1") {
                tempArrClinic1.push(clinicType[0]);
            }else if(clinicResponseMenu === "2"){
                tempArrClinic1.push(clinicType[1]);
            }else if(clinicResponseMenu === "3"){
                tempArrClinic1.push(clinicType[2]);
            }else{
                console.log("")
                console.log(`   ${chalk.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")}`)
                await backToMainMenu(String("0"));
            }
            tempAdr22.splice(0, tempAdr22.length);

            clinics.forEach(clinic => {

                if(clinic.name === tempArrClinic1[0]){

                    clinic.name = tempArrClinic1[1];
                    clinic.address = tempArrClinic1[2];
                    clinic.city = tempArrClinic1[3];
                    clinic.type = tempArrClinic1[4];

                }

            })

            console.log("");
            console.log(`   ${chalk.blueBright("########################################################")}`);
            console.log(`   ${chalk.blueBright("########################################################")}\n`);
            console.log(`   Obiekt o podanej nazwie: ${chalk.blueBright(tempArrClinic1[0])},  został pomyślnie zaktualizowany.`);
            tempAdr22.splice(0, tempAdr22.length);
            tempArrClinic1.splice(0, tempArrClinic1.length);
            await backToMainMenu(String( "0"));

        }else{

            return await backToMainMenu(String( "0"));

        }



    }else if (selectedOpt === "3") {

                if(clinics.length === 0){
                    console.log("")
                    console.log(`   ${chalk.yellowBright("W bazie danych nie ma aktualnie żadnej kliniki. Dodaj klinikę aby skorzystać z tej opcji")}`)
                    await backToMainMenu(String("0"));
                }

                clinics.forEach(clinic => {

                    console.log("");
                    console.log(`   ${chalk.blackBright("dbID: ")} ${chalk.yellowBright(clinic.id)},`);
                    console.log(`   ${chalk.blackBright("Nazwa placówki: ")} ${chalk.greenBright(clinic.name)},`);
                    console.log(`   ${chalk.blackBright("Adres: ")} ${chalk.greenBright(clinic.address)},`);
                    console.log(`   ${chalk.blackBright("Kod pocztowy i miasto: ")} ${chalk.greenBright(clinic.city)},`);
                    console.log(`   ${chalk.blackBright("Typ placówki: ")} ${chalk.greenBright(clinic.type)},`);
                    console.log("");

                })

                return await backToMainMenu(String( "0"));

    }else if (selectedOpt === "4") {


        clinicResponseMenu = await askQuestion("\n   Podaj nazwę placówki: ");
        await validValue(clinicResponseMenu);
        await quantityValidator(clinicResponseMenu);

        clinics.forEach(clinic => {

            if(clinic.name === clinicResponseMenu){

                console.log("");
                console.log(`   ${chalk.blackBright("dbID: ")} ${chalk.yellowBright(clinic.id)},`);
                console.log(`   ${chalk.blackBright("Nazwa placówki: ")} ${chalk.greenBright(clinic.name)},`);
                console.log(`   ${chalk.blackBright("Adres: ")} ${chalk.greenBright(clinic.address)},`);
                console.log(`   ${chalk.blackBright("Kod pocztowy i miasto: ")} ${chalk.greenBright(clinic.city)},`);
                console.log(`   ${chalk.blackBright("Typ placówki: ")} ${chalk.greenBright(clinic.type)},`);
                console.log(`   ${chalk.blackBright("Ilość aktywnych pacjentów: ")} ${chalk.greenBright(clinic.patients.length)},`);

            }

        })

        console.log("")
        await backToMainMenu(String( "0"));

    }else if (selectedOpt === "5") {


        if(clinics.length === 0){
            console.log("")
            console.log(`   ${chalk.yellowBright("W bazie danych nie ma aktualnie żadnej kliniki. Dodaj klinikę aby skorzystać z tej opcji")}`)
            await backToMainMenu(String("0"));
        }

        clinicResponseMenu = await askQuestion("\n   Podaj nazwę placówki: ");
        await validValue(clinicResponseMenu);
        await quantityValidator(clinicResponseMenu);

        clinics.forEach(clinic => {

            if(clinic.name === clinicResponseMenu){

                clinic.patients.forEach(patient => {

                    console.log("");
                    console.log(`   ${chalk.blackBright("dbID: ")} ${chalk.yellowBright(patient.id)},`);
                    console.log(`   ${chalk.blackBright("Imię i nazwisko: ")} ${chalk.greenBright(patient.name)},`);
                    console.log(`   ${chalk.blackBright("Pesel: ")} ${chalk.greenBright(patient.personalID)},`);
                    console.log(`   ${chalk.blackBright("Płeć: ")} ${chalk.greenBright(patient.gender)},`);
                    console.log(`   ${chalk.blackBright("Adres: ")} ${chalk.greenBright(patient.address)},`);
                    console.log(`   ${chalk.blackBright("Kod pocztowy i miasto: ")} ${chalk.greenBright(patient.city)},`);
                    console.log(`   ${chalk.blackBright("Numer telefonu: ")} ${chalk.greenBright(patient.phoneNumber)},`);
                    console.log(`   ${chalk.blackBright("Adres email: ")} ${chalk.greenBright(patient.email)},`);
                    console.log(`   ${chalk.blackBright("Numer karty pacjenta: ")} ${chalk.greenBright(patient.cardNumber)},`);
                    console.log(`   ${chalk.blackBright("Data utworzenia konta: ")} ${chalk.greenBright(patient.createdAt)},`);
                    console.log("");

                })

            }

        })

        console.log("");
        await backToMainMenu(String( "0"));

    }else if (selectedOpt === "6"){

        await validRole();

        let clinicToRemove: string = "";
        let clinicID: string = "";

        clinicResponseMenu = await askQuestion("\n   Podaj nazwę placówki: ");
        await validValue(clinicResponseMenu);
        await quantityValidator(clinicResponseMenu);

        clinics.filter(item => {
            if (clinicResponseMenu === item.name) {
                clinicID = item.id
                clinicToRemove = item.address
                return;
            }
        })

        clinicResponseMenu = await askQuestion(chalk.redBright(`\n   Przepisz adres placówki w celu usunięcia jej z bazy\n   [ ${chalk.cyanBright(`${clinicToRemove}`)} ]: `));
        await validValue(clinicResponseMenu);

        if (clinicResponseMenu === clinicToRemove) {

            const index = clinics.findIndex(item => item.id === clinicID);

            if (index !== -1) {
                clinics.splice(index, 1);
            }

            console.log("")
            console.log(`   ${chalk.bold.bgRed("Placówka została pomyślnie usunięta.\n")}`)
            await backToMainMenu(String("0"));

        } else if (clinicResponseMenu !== clinicToRemove) {

            console.log("");
            console.log(`   ${chalk.redBright("Podana wartość jest nie prawidłowa. Placówka nie została usunięta.")}`);
            await backToMainMenu(String( "0"));

        }


    }else if(selectedOpt === "0"){

                return await backToMainMenu(String( "0"));

    }else{

                console.log("")
                console.log(`   ${chalk.redBright("Nieprawidłowy numer!. Sprawdź numer i Spróbuj ponownie.")}`)
                await backToMainMenu(String("0"));

    }

}


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


async function main() {

    let validation: boolean = false;

    if(currentUser === null){

        const login = await askQuestion(chalk.magentaBright("\n   Wprowadź login: \n   "));
        if(login === "" || login.length > 75 || login.length < 5){
            console.log(`   ${chalk.redBright("Nie wpisano żadnej wartości lub nie spełnia ona kryteriów")}`);
            process.exit(0);
        }
        const password = await askQuestion(chalk.magentaBright("\n   Wprowadź hasło: \n   "));
        if(password === ""){
            console.log(`   ${chalk.redBright("Nie wpisano żadnej wartości")}`);
            process.exit(0);
        }

        users.forEach(item => {
            if (login === item.name && password === item.password) {
                currentUser = item;
                validation = true;
                return;
            }
        });

        if (!validation) {
            console.log("")
            console.log(`   ${chalk.redBright("Wprowadzono niepoprawny login lub hasło")}`);
            process.exit(0);

        }

    }


    const mainInvitation: string =
        "\n" +
        "\n" +

        chalk.bold.blackBright("   ########################################################\n") +
        chalk.bold.blackBright("   ################################################\n") +
        "\n" +
        chalk.bold.greenBright(`       Zalogowany user: ${currentUser.name} | Uprawnienia: ${currentUser.role}\n`) +
        "\n" +
        `       Menu główne | Aktualna data: ${chalk.bold.underline.yellowBright(moment().format('DD.MM.YYYY'))}\n` +
        "\n" +

        chalk.bold.blackBright("   ################################################\n") +
        chalk.bold.blackBright("   ########################################################\n") +
        "\n" +
        "   Wybierz cyfrę i zatwierdź:\n" +
        "\n" +
        chalk.bold.yellowBright(`   0.) Zakończ działanie programu,\n`) +
        chalk.cyanBright(`   1.) ${mainMenu[0]},\n`) +
        chalk.cyanBright(`   2.) ${mainMenu[1]},\n`) +
        chalk.cyanBright(`   3.) ${mainMenu[2]},\n`) +
        chalk.cyanBright(`   4.) ${mainMenu[3]},\n`) +
        chalk.cyanBright(`   5.) ${mainMenu[4]},\n`) +
        "\n" +
        `   Wybrana ${chalk.underline("cyfra")}: `;

    let mainRespons = await askQuestion(mainInvitation);
    await validValue(mainRespons);

    switch (mainRespons) {
        case "0":
            console.log("")
            console.log(chalk.bold.blackBright("   ##############################\n"));
            console.log(`   ${chalk.greenBright(`Użytkownik ${chalk.bgBlack(currentUser.name)} został wylogowany pomyślnie. Dziękujemy!`)}`);
            console.log("");
            console.log(chalk.bold.blackBright("   ##############################\n"));
            currentUser = null;
            process.exit(0);

            break;
        case "1":
            mainRespons = await askQuestion(accountMenuPattern);
            await validValue(mainRespons);
            await handleMyAccount(mainRespons);
            if (mainRespons === "0") {
                console.log("");
                console.log(chalk.yellowBright("   Good Bye!"));
                return backToMainMenu("0");
            }
            break;
        case "2":
            await validRole();
            mainRespons = await askQuestion(adminMenuPattern);
            await validValue(mainRespons);
            await handleAdminMenu(mainRespons);
            if (mainRespons === "0") {
                console.log("");
                console.log(chalk.yellowBright("   Good Bye!"));
                return backToMainMenu("0");
            }
            break;
        case "3":
            mainRespons = await askQuestion(patientMenuPattern);
            await validValue(mainRespons);
            await handlePatientMenu(mainRespons);
            if (mainRespons === "0") {
                console.log("");
                console.log(chalk.yellowBright("   Good Bye!"));
                return backToMainMenu("0");
            }
            break;
        case "4":
            mainRespons = await askQuestion(clinicMenu);
            await validValue(mainRespons);
            await handleClinicMenu(mainRespons);
            if (mainRespons === "0") {
                console.log("");
                console.log(chalk.yellowBright("   Good Bye!"));
                return backToMainMenu("0");
            }
            break;
        case "5":
            switchUser = true;
            currentUser = null;
            await backToMainMenu(mainRespons);
            break;
        default:
            return await backToMainMenu(mainRespons);
    }

    readline.close();

}

main().then(r => console.log(r));
