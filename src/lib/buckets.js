// Mapa dos 3 baldes do diagnóstico (fonte: laudo do Caio, "MAPA DOS 3 BALDES").
// O balde nasce do Q2 (multi-select de sentimientos). Q3 "Tengo miedo de su
// reacción" soma meio ponto em Confianza como desempate fino (opcional no
// laudo): só decide quando o Q2 empatou, nunca atropela uma maioria clara.
// Empate puro: prioridade Deseo > Confianza > Conexión.
// Cada balde carrega a ponte de taxonomia com a forma que a Dra. Sofía fala
// nos vídeos (anestesia emocional / distancia funcional / silencio acumulado).

export const BUCKETS = {
  deseo: {
    id: 'deseo',
    label: 'Bloqueo de Deseo',
    videoForm: 'anestesia emocional',
  },
  conexion: {
    id: 'conexion',
    label: 'Bloqueo de Conexión',
    videoForm: 'distancia funcional',
  },
  confianza: {
    id: 'confianza',
    label: 'Bloqueo de Confianza',
    videoForm: 'silencio acumulado',
  },
};

export const FEELING_SE_ALEJA =
  'Se aleja y vuelve: por días parece que regresa, y después se apaga otra vez';

const FEELING_TO_BUCKET = {
  'La intimidad prácticamente desapareció': 'deseo',
  'Tengo miedo de que se interese por otra': 'deseo',
  'Parecemos dos extraños viviendo bajo el mismo techo': 'conexion',
  'Está siempre en el celular, distante': 'conexion',
  'Me siento invisible para él': 'conexion',
  'Yo todavía lo amo, pero no sé si él aún me ama': 'confianza',
  'Discutimos por cualquier tontería': 'confianza',
  [FEELING_SE_ALEJA]: 'confianza',
};

const Q3_MIEDO_REACCION = 'Tengo miedo de su reacción';

// Ordem de desempate: Deseo > Confianza > Conexión (laudo do Caio).
const TIE_ORDER = ['deseo', 'confianza', 'conexion'];

export function computeBucket({ feelings = [], triedTalking = null } = {}) {
  const score = { deseo: 0, conexion: 0, confianza: 0 };
  for (const f of feelings || []) {
    const bucketId = FEELING_TO_BUCKET[f];
    if (bucketId) score[bucketId] += 1;
  }
  // Desempate fino: meio ponto não supera maioria do Q2, só resolve empate.
  if (triedTalking === Q3_MIEDO_REACCION) score.confianza += 0.5;

  const max = Math.max(score.deseo, score.conexion, score.confianza);
  // Sem sinal nenhum: Conexión é o guarda-chuva default (laudo do Caio).
  if (max === 0) return BUCKETS.conexion;

  const winner = TIE_ORDER.find((id) => score[id] === max);
  return BUCKETS[winner];
}
