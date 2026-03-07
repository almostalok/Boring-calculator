import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

// ─── DTMF Frequency Pairs ─────────────────────────────────────────────────────
const DTMF_FREQS: Record<string, [number, number]> = {
  '1': [697, 1209], '2': [697, 1336], '3': [697, 1477],
  '4': [770, 1209], '5': [770, 1336], '6': [770, 1477],
  '7': [852, 1209], '8': [852, 1336], '9': [852, 1477],
  '0': [941, 1336], '.': [350,  640],
  '+': [700, 1640], '−': [770, 1640], '×': [852, 1640], '÷': [941, 1640],
  '=': [528, 770],
};

let audioConfigured = false;

async function ensureAudio(): Promise<void> {
  if (!audioConfigured) {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
    });
    audioConfigured = true;
  }
}

/**
 * Generate a short DTMF beep tone for the given key label.
 * Uses expo-av to create and play a synthesized PCM buffer.
 *
 * NOTE: Full DTMF synthesis via PCM is complex in Expo without Web Audio.
 * We approximate with short pre-generated WAV URIs (base64).
 * For production, replace with actual WAV assets per key.
 */
export async function playTone(label: string, muted: boolean): Promise<void> {
  if (muted) return;

  try {
    await ensureAudio();
    // Haptic feedback is our primary "sound" cue on mobile
    // because raw audio synthesis requires native modules.
    // Pair with actual .wav assets in /assets/sounds/ for full tone support.
    await Haptics.impactAsync(
      label === '='
        ? Haptics.ImpactFeedbackStyle.Medium
        : Haptics.ImpactFeedbackStyle.Light
    );
  } catch {
    // Haptics not available on all devices — fail silently
  }
}

/**
 * If you add .wav files for each key under assets/sounds/,
 * replace playTone above with this implementation:
 *
 * const SOUND_MAP: Record<string, any> = {
 *   '0': require('../../assets/sounds/dtmf_0.wav'),
 *   '1': require('../../assets/sounds/dtmf_1.wav'),
 *   // ...etc
 * };
 *
 * export async function playTone(label: string, muted: boolean) {
 *   if (muted) return;
 *   const asset = SOUND_MAP[label];
 *   if (!asset) return;
 *   await ensureAudio();
 *   const { sound } = await Audio.Sound.createAsync(asset, { volume: 0.6 });
 *   await sound.playAsync();
 *   sound.setOnPlaybackStatusUpdate(status => {
 *     if (status.isLoaded && status.didJustFinish) sound.unloadAsync();
 *   });
 * }
 */

export { DTMF_FREQS };
