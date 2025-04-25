import { Audio } from "expo-av";

async function playSonido(sonido) {
    const { sound } = await Audio.Sound.createAsync(sonido);
    await sound.playAsync(); // Ejecuta el sonido
}

export default playSonido;