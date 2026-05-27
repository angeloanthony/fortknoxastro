IMAGE FOLDER — placeholder
==========================
The original site references images via relative paths like
"pictures/fortknoxlogo.webp", "pictures/HighSecurity02.webp", etc.

These image files were intentionally NOT included in the migration upload.
Drop the original image files into THIS folder (/public/pictures/), keeping
the exact same filenames. Astro serves /public at the site root, so a file at
  /public/pictures/fortknoxlogo.webp
is served at
  /pictures/fortknoxlogo.webp
and the existing relative references in the pages will resolve correctly.

No page markup needs to change — just add the image files here.
