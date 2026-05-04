# Setup de Umami self-hosted (analytics + conversion tracking)

Guía paso a paso para deployar tu propia instancia de Umami en Vercel + Neon (todo gratis) y conectarla al sitio. **Tiempo total: ~20 minutos**.

## ¿Qué vamos a tener al final?

- Una instancia de Umami corriendo en `https://umami-ghetti.vercel.app` (URL ejemplo).
- Dashboard con: pageviews, visitantes únicos, países, dispositivos, referrers.
- Tres eventos de conversión trackeados automáticamente:
  - `whatsapp_click` con propiedad `source` (hero, jubilacion-flyer, multas-flyer, header, footer, contact, article-page).
  - `email_click` con la misma propiedad.
  - `form_submit_success` con propiedad `area` (jubilacion-docente, multas, etc).
- Cero cookies, cero banner de consentimiento, alineado con CASI/Ley 5177.

## Costo

**$0/mes** mientras estés bajo:
- 50 GB de transferencia/mes en Vercel (generoso para una instancia chica)
- 3 GB de storage en Neon (alcanzan para millones de eventos)

Si la cosa explota y supera esos límites, Neon Pro arranca en ~$19/mes y Vercel Pro en $20/mes — pero para llegar ahí tendrías que tener tráfico serio.

---

## Paso 1: Crear la base de datos en Neon (5 min)

1. Andá a [neon.tech](https://neon.tech) y registrate con tu cuenta de GitHub o Google.
2. **Create a project**:
   - Project name: `umami-ghetti`
   - Postgres version: la última (17+)
   - Region: la más cercana (probablemente `aws-us-east-1`).
3. En la pantalla de bienvenida copiá el **connection string** que aparece en "Connection Details". Se ve así:
   ```
   postgresql://neondb_owner:XXXXXX@ep-xxx-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```
   Guardala — la vas a pegar en el siguiente paso.

> ℹ️ Neon free tier: 0.5 GB storage, 191 hours compute/mes. Para Umami esto rinde varios meses; cuando empiece a apretar, te avisan.

---

## Paso 2: Deploy de Umami en Vercel (10 min)

### 2.1 Fork del repo (opcional pero recomendado)

Si querés controlar versiones y actualizar cuando salga una nueva, forkeá [github.com/umami-software/umami](https://github.com/umami-software/umami) a tu cuenta.

Si no, podés deployar directo desde el template oficial.

### 2.2 Deploy

1. Andá a [vercel.com/new](https://vercel.com/new).
2. **Import Git Repository**:
   - Si forkeaste: seleccioná `tu-usuario/umami`.
   - Si no: pegá `https://github.com/umami-software/umami` en "Import Third-Party Git Repository".
3. **Project name**: `umami-ghetti` (o lo que prefieras).
4. **Framework preset**: Next.js (debería autodetectarse).
5. **Environment Variables** — esto es lo importante. Agregá estas tres:

   | Name | Value |
   | --- | --- |
   | `DATABASE_URL` | El connection string de Neon (paso 1.3) |
   | `HASH_SALT` | Una string aleatoria de 32+ chars. Generá con `openssl rand -base64 32` o usá [randomkeygen.com](https://randomkeygen.com) |
   | `APP_SECRET` | Otra string aleatoria distinta. Mismo método. |

6. Click **Deploy**. Tarda ~2 min.

### 2.3 Configurar región (opcional)

En **Settings → Functions**, configurá la región de las functions a la misma que Neon (ej: `iad1` para `us-east-1`). Esto reduce latencia de las queries.

---

## Paso 3: Primer login en Umami (2 min)

1. Una vez que termine el deploy, abrí la URL que te dio Vercel (ej: `https://umami-ghetti.vercel.app`).
2. Login con las credenciales por defecto:
   - **Username**: `admin`
   - **Password**: `umami`
3. **CRÍTICO**: Inmediatamente cambiá el password. Settings (engranaje arriba) → Profile → Change password.
4. **Add a website**:
   - Settings → Websites → Add website.
   - Name: `Estudio Ghetti`
   - Domain: `estudioghetti.com`
   - Click Save.
5. Click en el website recién creado → tab **Edit** → copiá el **Website ID** (UUID, ej: `7a8b9c0d-1e2f-3g4h-5i6j-7k8l9m0n1o2p`).

---

## Paso 4: Conectar el sitio (3 min)

### 4.1 En Vercel (producción)

1. Andá al proyecto **abogacia-web** en Vercel (no a Umami).
2. **Settings → Environment Variables** → agregá:

   | Name | Value | Environment |
   | --- | --- | --- |
   | `PUBLIC_UMAMI_URL` | `https://umami-ghetti.vercel.app` (tu URL de Umami) | Production, Preview |
   | `PUBLIC_UMAMI_WEBSITE_ID` | El UUID del paso 3.5 | Production, Preview |

3. **Deployments → último deploy → Redeploy**. (Las env vars no se aplican hasta el próximo deploy.)

### 4.2 En local (opcional, para probar)

Editá `.env` en el repo y agregá:

```bash
PUBLIC_UMAMI_URL=https://umami-ghetti.vercel.app
PUBLIC_UMAMI_WEBSITE_ID=tu-uuid-aca
```

Reiniciá `npm run dev`.

---

## Paso 5: Verificar que funciona (2 min)

1. Abrí la web (`https://estudioghetti.com` o `localhost:4321`).
2. Abrí DevTools → **Network** → filtrá por `umami` o `script.js`.
3. Tendrías que ver:
   - `script.js` cargando desde tu instancia de Umami (200 OK).
   - Una request a `/api/send` (POST 200) cuando entrás a la página.
4. En el dashboard de Umami → **Realtime** → tendrías que verte como visitante activo.
5. Click en cualquier link de WhatsApp del sitio. Volvé al dashboard → **Events** → ahí va a aparecer `whatsapp_click` con el `source` que corresponda (`hero`, `multas-flyer`, etc).
6. Mandá una consulta de prueba por el form. Tendría que aparecer `form_submit_success`.

Si ves todo eso → **listo, ya estás trackeando conversiones**.

---

## Cómo leer los datos

### Conversion rate por área

En el dashboard de Umami:
1. Tab **Events** → ver cuántos `whatsapp_click` hubo este mes.
2. Click en el evento → ves la propiedad `source` desglosada.
3. Comparás contra **Pageviews del mismo período**.

Conversión por área = `eventos con source=multas-flyer / pageviews de #multas`.

### Atribución por canal

En Umami → **Referrers** ves de dónde viene el tráfico. Combinado con UTM en los links de WhatsApp/Instagram (ej: `https://estudioghetti.com/?utm_source=whatsapp&utm_medium=flyer&utm_campaign=multas`), podés diferenciar cada campaña.

### Reportes para el TFG

Umami tiene **export CSV** en cada vista. Para el seminario integrador, exportás los eventos de un período y armás el análisis de impacto del GEO con datos reales.

---

## Mantenimiento

- **Actualizar Umami**: si forkeaste, sincronizás con upstream cada par de meses (`gh repo sync` o desde la UI de GitHub). Vercel redeploya automáticamente.
- **Backup de la DB**: Neon tiene point-in-time restore en el plan gratis (7 días). Si te paranoia, exportás la DB con `pg_dump` cada tanto.
- **Si superás Neon free tier**: te avisan por email antes de que pase. Migrás a Neon Pro ($19/mo) o cambiás de DB provider.

---

## Troubleshooting

**No veo eventos en el dashboard**

- ¿Está el script cargando? DevTools → Network → buscá `script.js`. Si no aparece, verificá que las env vars estén seteadas en Vercel.
- ¿El dominio en Umami coincide con el dominio donde está el sitio? El componente envía `data-domains="estudioghetti.com"`. Si tu staging está en `abogacia-web-xxx.vercel.app`, los eventos no van a contar (es por seguridad).
  - **Para que cuente staging**: editá `src/components/Analytics.astro` y agregá ambos dominios separados por coma: `data-domains="estudioghetti.com,abogacia-web.vercel.app"`.

**El script de Umami carga pero no se manda eventos**

- Probá visitar `https://umami-ghetti.vercel.app/api/send` con un POST de prueba. Si tira 401/500, hay problema en el backend.
- Revisá logs de Vercel del proyecto Umami (Functions → ver logs).

**Adblockers bloquean el script**

- Algunos adblockers bloquean `/script.js` reconocido como Umami. Solución: en el deploy de Umami, agregar env var `TRACKER_SCRIPT_NAME=stats.js` y `COLLECT_API_ENDPOINT=/api/event`. Después actualizar `Analytics.astro` para usar esos paths.
- Para este sitio (Argentina, audiencia no-tech-savvy), probablemente no es un problema serio.
