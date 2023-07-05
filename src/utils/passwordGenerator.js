export default function createPassword() {
    const lenght = 24;

    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+=';

    const allChars = upperCase + lowerCase + numbers + symbols;

    let password = '';

    while(lenght > password.length) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    return password;
}