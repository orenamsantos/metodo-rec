# Image Assets — Método R.E.C.

Estáticos servidos pelo Vite a partir de `public/`. Referencie no código como
`/images/retratos/<arquivo>.png` ou `/images/prints/<arquivo>.png` (sem o
prefixo `public/`).

## `retratos/` — 8 retratos de personas LATAM

Fotos usadas em depoimentos (Landing e Tela 12 / Oferta).

| Arquivo                          | Persona     | Idade | País      | Contexto de uso          |
| -------------------------------- | ----------- | ----- | --------- | ------------------------ |
| `camila-mexico-47.png`           | Camila      | 47    | México    | Landing — depoimento     |
| `alejandra-peru-49.png`          | Alejandra   | 49    | Peru      | Landing — depoimento     |
| `leticia-brasil-35.png`          | Letícia     | 35    | Brasil    | Landing — depoimento     |
| `marina-argentina-42.png`        | Marina      | 42    | Argentina | Landing — depoimento     |
| `carolina-colombia-38.png`       | Carolina    | 38    | Colômbia  | Tela 12 — oferta         |
| `patricia-chile-44.png`          | Patrícia    | 44    | Chile     | Tela 12 — oferta         |
| `marina-s-colombia-40.png`       | Marina S.   | 40    | Colômbia  | Tela 12 — oferta         |
| `leticia-m-argentina-33.png`     | Letícia M.  | 33    | Argentina | Tela 12 — oferta         |

## `prints/` — 6 prints de prova social

Screenshots de WhatsApp e Instagram usados nas seções de validação.

| Arquivo                              | Tipo            | Título / Cena                           | Contexto narrativo                                     |
| ------------------------------------ | --------------- | --------------------------------------- | ------------------------------------------------------ |
| `whatsapp-roberto-intima.png`        | WhatsApp        | Conversa com Roberto                    | Recuperação de intimidade do casal                     |
| `whatsapp-sofi-amiga.png`            | WhatsApp        | Troca com a amiga Sofi                  | Indicação espontânea entre amigas                      |
| `instagram-story-camila.png`         | Instagram Story | Story da Camila                         | Depoimento orgânico em story                           |
| `whatsapp-mi-amor-gratidao.png`      | WhatsApp        | "Mi amor" — mensagem de gratidão        | Reconciliação e retorno do carinho                     |
| `instagram-comment-anabel.png`       | Instagram       | Comentário da Anabel                    | Validação pública em comentário de post                |
| `whatsapp-patricia-audio.png`        | WhatsApp        | Áudio enviado por Patrícia              | Depoimento em áudio (transcrito/citado no copy)        |

## Convenções

- **Formato:** PNG.
- **Nomenclatura:** `<primeiro-nome>[-inicial]-<pais>-<idade>.png` para retratos; `<canal>-<remetente-ou-cena>-<tema>.png` para prints.
- **Otimização:** retratos a 800×800 e prints a 600×1066 (9:16), comprimidos com `pngquant --quality=75-90 --strip`. Total da pasta ≈ 3.8MB.

Para re-otimizar após adicionar novas imagens:

```bash
# retratos
for f in public/images/retratos/*.png; do
  convert "$f" -resize "800x800>" -strip "$f.tmp" && \
    pngquant --quality=75-90 --strip --force --output "$f" "$f.tmp" && rm "$f.tmp"
done

# prints
for f in public/images/prints/*.png; do
  convert "$f" -resize "600x1067>" -strip "$f.tmp" && \
    pngquant --quality=75-90 --strip --force --output "$f" "$f.tmp" && rm "$f.tmp"
done
```
