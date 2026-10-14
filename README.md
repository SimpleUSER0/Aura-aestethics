# AUREA AESTHETICS — SimpleWeb.ge portfolio demo

ბილდის გარეშე მომუშავე, ქართულ-ინგლისური ესთეტიკური კლინიკის დემო.

## გაშვება
გახსენით `index.html` ბრაუზერში. არ არის საჭირო ინსტალაცია, backend ან build tools.

## GitHub Pages
1. არქივიდან ატვირთეთ პროექტის შიგთავსი რეპოზიტორიის root-ში: `index.html`, `css/`, `js/`, `assets/`.
2. Settings → Pages → Deploy from a branch → main → /(root) → Save.
3. ყველა რესურსის გზა ფარდობითია; საიტი მუშაობს repository subpath-ზეც.
4. გამოქვეყნების შემდეგ `og:image` ჩაანაცვლეთ ფოტოს სრული HTTPS მისამართით, რადგან სოციალური პლატფორმები სრულ URL-ს საჭიროებენ. დაამატეთ `og:url` და canonical მხოლოდ რეალური URL-ის მიღების შემდეგ.

## შინაარსი და ფუნქციები
- ყველა ბრენდი და სპეციალისტის პროფილი დემოა; real qualifications, certificates, medical outcomes and testimonials are not claimed.
- KA / EN ცვლის ტექსტებს, ფორმის ვარიანტებს, image alt-ს, aria-label-ს და SEO metadata-ს.
- ბრაუზერში ინახება მხოლოდ `aurea-language`. ფორმის მონაცემები არ ინახება და არ იგზავნება.
- Form validates name, phone and chosen focus; successful submission only displays a demo confirmation. Data clears on success/cancel.
- Keyboard-accessible native dialog, Escape close and focus restoration.
- FAQ, mobile navigation, comparison slider, sticky mobile CTA and reduced-motion support.
- Before/after uses exactly the same illustrative image on both sides. No outcome is represented.
- Unknown contact information is marked as demo / to be confirmed. Social placeholders open an explanation rather than fake links.

## რეალურ ბიზნესზე მორგება
ბრენდისა და კონტაქტების ცვლილებები შეიტანეთ `index.html`-ში, ორივე `data-ka` და `data-en` მნიშვნელობაში. ახალი მონაცემების რეალურად გაგზავნა მოითხოვს ცალკე ინტეგრაციას. რეალური სამედიცინო შინაარსი და პროფესიული კვალიფიკაციები ბიზნესმა უნდა გადაამოწმოს.

## Structure
index.html
css/style.css
js/script.js
assets/fonts/
assets/images/
assets/favicon.svg

See CREDITS.md for image/font attribution and QA.md for completed checks.
