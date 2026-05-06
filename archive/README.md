# Archive — assets fuera del deploy

Material guardado para uso futuro (tarjetas de presentación, variantes de logo).
**No entra al build de Astro** (vive fuera de `public/`) y no se despliega.

## images/

- `backpresentationcard.png`, `frontpresentationcard.png` — diseño de tarjeta personal (no usados en la web).
- `logo-withbackground.png`, `logowithbackground.png` — logo sobre fondo navy (versiones para impresión).

Si en el futuro alguno necesita servirse desde la web, moverlo a `public/`
o (mejor) importarlo desde `src/` con `astro:assets` para que reciba
optimización automática (WebP/AVIF, srcset, hashing inmutable).
