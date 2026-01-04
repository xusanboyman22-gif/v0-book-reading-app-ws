export interface Book {
  id: string
  title: string
  author: string
  cover: string
  description: string
  category: string
  pages: number // This is now just for display, actual pages calculated from content
  year: number
  language: string
  content: string
  downloadUrl?: string
}

export const uzbekBooks: Book[] = [
  {
    id: "1",
    title: "O'tkan kunlar",
    author: "Abdulla Qodiriy",
    cover: "/uzbek-classic-novel-otkan-kunlar-book-cover.jpg",
    description: "O'zbek adabiyotining birinchi romani. Otabek va Kumushning muhabbat qissasi.",
    category: "Klassik adabiyot",
    pages: 0, // Will be calculated
    year: 1926,
    language: "O'zbek",
    content: `BIRINCHI QISM

BIRINCHI BOB: TOSHKENTDA

Toshkent — qadimiy shahar. Ming yillardan buyon bu yerda odamlar yashab kelganlar. Shaharning ikki qismi bor: eski shahar va yangi shahar. Eski shaharda tor ko'chalar, baland devorlar, qadimiy masjidlar va madrasalar ko'p.

Otabek — yigirma besh yoshli yigit. U Marg'ilondan kelgan. Uning otasi Yusufbek hoji — boy savdogar. Otabek yoshligidan kitob o'qishni, ilm olishni yaxshi ko'radi. U Buxoroda o'qib, bilimli bo'lib qaytgan.

Otabek Toshkentga savdo ishlariga kelgan edi. U bu yerda bir necha kun turmoqchi bo'ldi. Lekin taqdirning o'yini boshqacha bo'ldi.

Bir kuni Otabek Chorsu bozoriga chiqdi. Bozor juda katta — ipak matolar, zardo'zlik buyumlar, qimmatbaho toshlar sotilardi. Otabek ipak do'konlarini ko'rib yurdi.

Bir do'konda u to'xtab qoldi. Do'kon ichida bir qiz turardi. Qiz juda chiroyli edi — qora ko'zlari, uzun sochlari, oq yuzi. U ipak matolarni ko'rsatayotgan edi.

Otabek qizni ko'rib, hayratda qoldi. U bunday go'zallikni hech qachon ko'rmagan edi. Qizning nomi Kumush edi.

Kumush — o'n yetti yoshli qiz. Uning otasi Qutidor — mashhur ipakchi. Kumush aqlli va mehribon qiz edi. U otasining do'konida yordam berardi.

Otabek va Kumush bir-birlariga qaradilar. Ularning ko'zlari to'qnashdi. O'sha lahzada ikkalasi ham his qildilar — bu oddiy qarash emas.

IKKINCHI BOB: MUHABBAT

Otabek endi har kuni bozorga kelardi. U turli bahonalar topardi — goh mato kerak, goh ip, goh boshqa narsa. Lekin aslida u Kumushni ko'rish uchun kelardi.

Kumush ham Otabekni kutardi. U ham yigitni yoqtirgan edi. Lekin ular ochiq gaplasha olmasdilar. O'sha zamonda bu mumkin emas edi.

Otabek bir kun qaror qildi — Kumushga sovchi yuborish kerak. U bu haqda otasiga xat yozdi. Yusufbek hoji o'g'lining xatini o'qib, o'ylandi.

"O'g'lim sevgan qizni olishi kerak," dedi u. "Lekin avval qizning oilasini bilish kerak."

Yusufbek hoji Qutidor haqida so'radi. Qutidor — hurmatli odam ekan. Uning qizi ham yaxshi tarbiya ko'rgan.

Sovchilar yuborildi. Qutidor sovchilarni qabul qildi. U Otabek haqida eshitgan edi — bilimli, odobli yigit.

"Men roziman," dedi Qutidor. "Lekin qizimning ham roziligi kerak."

Kumush otasidan bu xabarni eshitdi. Uning yuragi tez-tez urdi. U Otabekni sevardi.

UCHINCHI BOB: TO'SIQLAR

Hamma narsa yaxshi bo'layotgandek edi. Lekin kutilmagan to'siq paydo bo'ldi.

Kumushning boshqa bir talabgori bor edi — Homid. Homid — boy va kuchli odam. U Kumushni ko'rgan va uni xohlagan edi.

Homid Qutidorga sovchi yubordi. U ko'p mahr va'da qildi. Qutidor ikkilandi.

"Homid boy odam," dedi qo'shnilar. "Qizingiz baxtli bo'ladi."

Lekin Kumush Homidni xohlamadi. U faqat Otabekni sevardi.

"Ota, men Otabekni tanladim," dedi Kumush. "Homidga tegmayman."

Qutidor qizining so'zini eshitdi. U qizini majburlamoqchi emas edi.

"Xo'p, qizim," dedi u. "Sening tanloving."

Homid rad javobini oldi. U juda g'azablandi. U qasos olmoqchi bo'ldi.

TO'RTINCHI BOB: NIKOH

Otabek va Kumushning nikoh kuni keldi. Bu katta to'y edi. Ikki shahardan odamlar keldi.

To'y uch kun davom etdi. Birinchi kun kelin tomondan, ikkinchi kun kuyov tomondan, uchinchi kun nikoh o'qildi.

Nikoh kuni Otabek eng chiroyli kiyimlarini kiydi. U ot minib, Kumushning uyiga keldi. Uning orqasidan do'stlari, qarindoshlari keldi.

Kumush ham tayyorlangan edi. Unga eng chiroyli atlas libos kiydirilgan. Boshiga oltin toj qo'yilgan. U haqiqiy malika kabi ko'rinardi.

Nikoh marosimi boshlandi. Imom duo o'qidi. Otabek va Kumush bir-birlariga "ha" dedilar. Ular endi er-xotin bo'ldilar.

To'ydan so'ng Otabek va Kumush Marg'ilonga jo'nadilar. Ular yangi hayot boshladilar.

BESHINCHI BOB: YANGI HAYOT

Marg'ilonda Otabek va Kumush baxtli hayot boshladilar. Ular katta hovlida yashadilar. Yusufbek hoji kelinini juda yaxshi qabul qildi.

Kumush yangi oilaga tez o'rganib oldi. U uy ishlarini yaxshi bajardi. Qaynona bilan munosabatlari yaxshi edi.

Otabek savdo ishlarini davom ettirdi. U Buxoroga, Samarqandga, Toshkentga safar qilardi. Har safar qaytganda Kumush uchun sovg'alar olib kelardi.

Bir yil o'tdi. Kumush homilador bo'ldi. Bu xabar butun oilani quvontirdi.

"Nabiram bo'ladi!" dedi Yusufbek hoji. "Xudo xohlasa, o'g'il bo'ladi."

Kumush og'ir kunlarni o'tkazdi. Otabek xotinini parvarish qildi. U eng yaxshi shifokorlarni chaqirdi.

Va nihoyat, bolasi tug'ildi. Bu o'g'il edi. Uni Yusuf deb atashdi — bobosining sharafiga.

OLTINCHI BOB: HOMIDNING QASOSI

Homid unutmagan edi. U bir yil davomida reja tuzdi. Endi qasos vaqti keldi.

Homid Marg'ilonga keldi. U shahar hokimining yaqini edi. Hokim bilan uchrashdi.

"Yusufbek hoji — xoin," dedi Homid. "U davlatga qarshi ishlayapti."

Bu yolg'on edi. Lekin hokim Homidga ishondi. U Yusufbek hojini hibsga olishni buyurdi.

Bir kechasi askarlar keldi. Ular Yusufbek hojini olib ketdilar. Otabek qarshi turdi, lekin uni ham urdilar.

"Ota! Ota!" deb qichqirdi Otabek.

Lekin hech kim eshitmadi. Yusufbek hojini zindonga tashlashdi.

YETTINCHI BOB: KURASH

Otabek otasini qutqarish uchun kurasha boshladi. U hokimga murojaat qildi. Lekin hokim uni qabul qilmadi.

Otabek Buxoroga jo'nadi. U yerda katta amaldorlarni tanirdi. Ulardan yordam so'radi.

Bir oy o'tdi. Ikki oy o'tdi. Nihoyat javob keldi — Yusufbek hoji aybsiz. Uni ozod qilish kerak.

Otabek bu xabar bilan Marg'ilonga qaytdi. Lekin kech edi. Yusufbek hoji zindonda kasal bo'lib, vafot etgan edi.

Otabek yig'ladi. Uning yuragi singan edi. Otasini yo'qotdi. Va bularning hammasi Homid yuzasidan bo'ldi.

"Men qasos olaman," dedi Otabek. "Homid buning jazosini tortadi."

SAKKIZINCHI BOB: ADOLAT

Otabek adolat izladi. U to'g'ri yo'ldan bordi. Homidni o'ldirishni istadi, lekin Kumush to'xtardi.

"Qotil bo'lma," dedi Kumush. "Qonuniy yo'ldan bor."

Otabek Buxoroga yana bordi. U amirga shikoyat qildi. Amir Homidning jinoyatlarini tekshirdi.

Tekshiruv uzoq davom etdi. Ko'p guvohlar so'roq qilindi. Oxir-oqibat haqiqat aniqlandi.

Homid hibsga olindi. U zindonga tashlandi. Uning mol-mulki musodara qilindi.

Otabek g'alaba qozondi. Lekin u baxtli emas edi. Otasi qaytmaydi. Hech narsa o'tmishni qaytara olmaydi.

TO'QQIZINCHI BOB: YANGI BOSHLANG'ICH

Yillar o'tdi. Otabek va Kumush hayotda davom etdilar. Ularning o'g'li Yusuf katta bo'ldi.

Yusuf — aqlli va mehnatsevar bola edi. U otasining izi bilan bordi. Savdogarlik qildi, kitob o'qidi.

Otabek keksaydi. Uning sochlari oqardi. Lekin u hamon kuchli edi.

Bir kun Otabek o'g'lini chaqirdi.

"O'g'lim," dedi u. "Men senga bir narsa aytmoqchiman."

"Eshitaman, ota."

"Hayotda eng muhim narsa — sevgi va adolat. Sevgi uchun kurash, adolat uchun kurash. Hech qachon taslim bo'lma."

Yusuf otasining so'zlarini eslab qoldi. U ham shu yo'ldan bordi.

O'NINCHI BOB: XOTIMA

Otabek uzun umr ko'rdi. U yetmish yoshida vafot etdi. Kumush undan bir yil oldin o'tgan edi.

Ularning qabri yonma-yon. Marg'ilonda, qadimiy qabriston. Hozir ham odamlar bu yerga kelishadi.

Otabek va Kumushning hikoyasi — sevgi haqida. Ular bir-birlarini sevdilar. Qiyinchiliklarni birga yengdilar.

Bu hikoya — o'zbek xalqining hikoyasi. Biz ham sevgi uchun kurashamiz. Biz ham adolat uchun kurashamiz.

"O'tkan kunlar" romani — Abdulla Qodiriyning buyuk asari. U o'zbek adabiyotining poydevori. Har bir o'zbek bu romanni o'qishi kerak.

IKKINCHI QISM

O'N BIRINCHI BOB: MARG'ILONDA

Marg'ilon — ipakchilik shahri. Bu yerda eng chiroyli atlas va adras to'qiladi. Butun dunyo Marg'ilon ipagini biladi.

Shaharda ko'p hunarmandlar yashaydi. Ular to'quvchilar, bo'yoqchilar, tikuvchilar. Har bir oilada ip yigirish, mato to'qish bilishadi.

Otabekning oilasi ham ipak savdosi bilan shug'ullanardi. Yusufbek hoji eng yaxshi ipakni sotardi. Uning do'koniga chet eldan ham kelishardi.

O'N IKKINCHI BOB: BUXORO SAFRI

Otabek yosh vaqtida Buxoroga o'qishga borgan edi. Buxoro — ilm markazi. Bu yerda ko'p madrasalar bor edi.

Otabek Mir Arab madrasasida o'qidi. U arab tilini, fors tilini o'rgandi. Fiqh, mantiq, falsafa o'qidi.

Madrasada ko'p do'stlar orttirdi. Ular bilan munozara qilishardi. Kitoblar haqida gaplashishardi.

Sakkiz yil o'qidi Otabek. Keyin Marg'ilonga qaytdi. U endi bilimli odam edi. Lekin u oddiyligicha qoldi.

O'N UCHINCHI BOB: KUMUSHNING BOLALIGI

Kumush Toshkentda tug'ilgan. Uning otasi Qutidor — ipakchi. Onasi Oftoboyim — uy bekasi.

Kumush yolg'iz farzand edi. Ota-onasi uni juda sevishardi. Unga hamma narsani berdilar.

Kumush yoshligidan kitobxon edi. U yashirincha o'qirdi. Chunki o'sha zamonda qizlar o'qimasligi kerak edi.

U she'r yozishni ham o'rgandi. O'z daftariga she'rlar yozardi. Hech kimga ko'rsatmasdi.

O'N TO'RTINCHI BOB: TAQDIR

Taqdir g'alati narsa. U odamlarni kutilmagan yo'llar bilan uchrashtiradi.

Otabek va Kumush bir-birlarini Chorsu bozorida ko'rdilar. Bu tasodif edi. Lekin bu tasodif ularning hayotini o'zgartirdi.

Agar Otabek o'sha kuni bozorga bormasa... Agar Kumush do'konda bo'lmasa... Hamma narsa boshqacha bo'lardi.

Lekin taqdir ularni uchrashtirdi. Va ular bir-birlarini sevdilar.

O'N BESHINCHI BOB: TO'Y TAYYORGARLIGI

To'yga tayyorgarlik uzoq davom etdi. Ikki oy tayyorgarlik ko'rildi.

Qutidor qiziga jahiz tayyorladi. Atlas ko'rpalar, ipak ko'ylaklar, oltin taqinchoqlar. Hammasi eng yaxshisidan.

Yusufbek hoji ham tayyorgarlik ko'rdi. U katta hovli sotib oldi. Kelin uchun alohida xona tayyorladi.

Marg'ilondan, Toshkentdan mehmonlar keldi. Buxorodan, Samarqanddan ham kelishdi. To'y juda katta bo'ldi.

O'N OLTINCHI BOB: KELINSALOM

To'ydan so'ng Kumush yangi oilaga keldi. U kelin bo'ldi. Kelinsalom marosimi bo'ldi.

Kumush qaynona oldiga bordi. Qaynona uni qabul qildi.

"Xush kelibsan, qizim," dedi qaynona. "Bu uy — sening uying."

Kumush qaynona qo'lini o'pdi. U hurmat ko'rsatdi. Qaynona kelinidan mamnun bo'ldi.

O'N YETTINCHI BOB: OILAVIY HAYOT

Otabek va Kumush baxtli oila qurdilar. Ular bir-birlarini hurmat qildilar. Bir-birlariga g'amxo'rlik qildilar.

Ertalab birga turdilar. Birga nonushta qildilar. Kechqurun birga suhbatlashdilar.

Kumush uy ishlarini bajardi. Ovqat pishirdi, kiyim tikdi. Otabek savdo bilan shug'ullandi.

Ular orasida janjal bo'lmadi. Chunki ular bir-birlarini tushundilar.

O'N SAKKIZINCHI BOB: BAHOR

Bahor keldi. Marg'ilonda daraxtlar gulladi. Havo iliq bo'ldi.

Kumush bog'ga chiqdi. U gullarni ko'rdi. Bulbullarni eshitdi.

"Qanday chiroyli!" dedi u.

Otabek ham keldi. U xotinining yoniga o'tirdi.

"Sen gullardan ham chiroylisan," dedi u.

Kumush kuldi. Uning kulishi qo'ng'iroq ovoziga o'xshardi.

Ular bog'da uzoq o'tirdilar. Bahor havosidan nafas oldilar. Baxtli edilar.

O'N TO'QQIZINCHI BOB: KUZ

Kuz ham keldi. Barglar to'kildi. Havo sovidi.

Otabek safardan qaytdi. U bir oy yo'lda bo'lgan edi. Buxoroga borgan, qaytgan.

Kumush eshik oldida kutardi. U erini sog'ingan edi.

"Xush kelding!" dedi u.

Otabek xotinini quchoqladi.

"Seni sog'indim," dedi u.

Ular uyga kirdilar. Otabek sovg'alarni olib chiqdi. Kumush uchun ipak ro'mol, oltin sirg'a.

"Qanday chiroyli!" dedi Kumush. "Rahmat."

YIGIRMANCHI BOB: QISH

Qish keldi. Qor yog'di. Havo juda sovuq bo'ldi.

Otabek va Kumush uyda o'tirdilar. Sandal atrofida isindi.

Kumush kitob o'qirdi. Otabek xat yozardi.

"Nima o'qiyapsan?" so'radi Otabek.

"Navoiy she'rlari," dedi Kumush.

Otabek qiziqdi. U ham kitobni oldi. Birga o'qidilar.

"Navoiy — buyuk shoir," dedi Otabek. "Uning she'rlarini hamma biladi."

"Ha," dedi Kumush. "U sevgi haqida juda chiroyli yozgan."

Ular tungi paytgacha o'qidilar. Keyin uxlashga ketdilar.

YIGIRMA BIRINCHI BOB: MUSIBAT

Hamma narsa yaxshi bo'layotgan edi. Lekin musibat kutilmagan keldi.

Yusufbek hoji kasal bo'ldi. U bir haftada yotib qoldi. Tabiblar keldilar, lekin foyda bermadi.

Otabek otasi oldida o'tirdi. U uning qo'lini ushlab turdi.

"Ota, tuzalib ketasiz," dedi u.

Yusufbek hoji boshini chayqadi.

"Yo'q, o'g'lim. Mening vaqtim keldi."

U o'g'liga nasihatlar berdi. Oilaga g'amxo'rlik qilishni buyurdi.

"Kumushni asra," dedi u. "U yaxshi qiz. Seni sevadi."

Otabek yig'ladi. Lekin otasiga va'da berdi.

Yusufbek hoji vafot etdi. Butun shahar motam tutdi. U hurmatli odam edi.

YIGIRMA IKKINCHI BOB: MOTAM

Motam davri og'ir o'tdi. Otabek qayg'uga tushdi. U hech kim bilan gaplashmadi.

Kumush eriga g'amxo'rlik qildi. U sabr qildi. Erini yupatdi.

"Otangiz jannatda," dedi u. "U yaxshi odam edi."

Otabek asta-sekin o'ziga keldi. U savdo ishlarini davom ettirdi. Otasining o'rnini oldi.

YIGIRMA UCHINCHI BOB: YANGI HAYOT

Hayot davom etdi. Otabek va Kumush yangi davr boshladilar.

Ularning o'g'li Yusuf o'sdi. U endi besh yoshda edi. Aqlli, mehribon bola.

Otabek o'g'liga ilm o'rgatdi. Harflarni, raqamlarni o'rgatdi. Yusuf tez o'rgandi.

Kumush ham o'g'liga tarbiya berdi. U bolaga yaxshilikni o'rgatdi. Odamlarni hurmat qilishni o'rgatdi.

Oila baxtli edi. Qiyinchiliklar orqada qoldi.

YIGIRMA TO'RTINCHI BOB: O'N YIL

O'n yil o'tdi. Yusuf katta bo'ldi. U endi o'n besh yoshda edi.

Yusuf — bilimli yigit. U madrasada o'qirdi. O'qituvchilari uni maqtashardi.

Otabek o'g'lidan mamnun edi.

"Sen menga o'xshaysan," dedi u. "Ilmni sevasan."

Yusuf otasini hurmat qilardi. U otasining izidan bormoqchi edi.

YIGIRMA BESHINCHI BOB: YAKUNIY BOB

Hayot davom etadi. Avlodlar almashadi. Lekin sevgi, adolat — abadiy.

Otabek va Kumushning hikoyasi — o'zbek xalqining hikoyasi. Biz ham sevgi uchun kurashamiz. Biz ham adolat uchun kurashamiz.

"O'tkan kunlar" romani — Abdulla Qodiriyning buyuk asari. U o'zbek adabiyotining poydevori. Har bir o'zbek bu romanni o'qishi kerak.

Bu roman bizga ko'p narsalarni o'rgatadi: sevishni, kurashishni, adolatli bo'lishni. Bu saboqlar har doim kerak.

Abdulla Qodiriy 1926-yilda bu romanni yozgan. O'shandan buyon millionlab odamlar o'qigan. Va hali ko'p avlodlar o'qiydi.

Chunki yaxshi kitoblar — abadiy.

TAMOM.`,
    downloadUrl: "https://kitob.uz/otkan-kunlar",
  },
  {
    id: "2",
    title: "Mehrobdan chayon",
    author: "Abdulla Qodiriy",
    cover: "/uzbek-literature-mehrobdan-chayon-book-cover.jpg",
    description: "XIX asr oxiri Qo'qon xonligida bo'lib o'tgan voqealar.",
    category: "Klassik adabiyot",
    pages: 0,
    year: 1929,
    language: "O'zbek",
    content: `BIRINCHI QISM

BIRINCHI BOB: QO'QON XONLIGI

Qo'qon — Farg'ona vodiysining qadimiy shahri. XIX asrda bu yerda xonlik bor edi. Qo'qon xonligi katta davlat edi. Uning chegaralari Toshkentdan Qashqargacha cho'zilgan.

Lekin xonlikda hammasi yaxshi emas edi. Xonlar zolim, amaldorlar ochko'z edi. Oddiy xalq qiyin kun kechirardi. Soliqlar og'ir, adolat yo'q edi.

Anvarxon — yosh xon. U hokimiyatga yaqinda kelgan. Anvarxon shafqatsiz edi. U o'z hokimiyatini mustahkamlash uchun ko'p qon to'kdi.

Xon saroyida hashamat hukm surardi. Xon va uning yaqinlari dabdabali hayot kechirar, oddiy xalq esa qashshoqlikda yashardi.

IKKINCHI BOB: RANO

Rano — yigirma yoshli qiz. U oddiy oiladan. Otasi — kosib, onasi — uy bekasi. Ular kambag'al, lekin halol odamlar edi.

Rano juda chiroyli qiz edi. Uning go'zalligi haqida butun shahar gapirardi. Lekin Rano faqat chiroyli emas, balki aqlli ham edi.

U yashirincha kitob o'qirdi. O'sha zamonda qizlar o'qimasligi kerak edi. Lekin Rano ilmga chanqoq edi. U arab tilini ham bilardi.

Bir kun Ranoning go'zalligi haqida xonga xabar yetdi. Xon uni saroyga chaqirtirdi.

Rano qo'rqdi. U saroyga bormaslikni istadi. Lekin xonning buyrug'iga qarshi borish mumkin emas edi.

UCHINCHI BOB: SAROYDA

Rano saroyga olib kelindi. U saroyning hashamatini ko'rib hayron qoldi. Oltin ustunlar, ipak pardalar, qimmatbaho gilamlar.

Lekin bu hashamat uni quvontirmadi. U erkinlikni xohlardi.

Xon Ranoni ko'rdi. U qizning go'zalligiga mahliyo bo'ldi.

"Bu qiz mening xorimim bo'ladi," dedi xon.

Rano bu so'zlarni eshitib, yuragi buzildi. U oilasini, erkinligini sog'inardi.

Saroyda Rano ko'p narsalarni ko'rdi. U xonning zulmini, amaldorlarning razilligini ko'rdi. U oddiy xalqning azoblarini tushundi.

TO'RTINCHI BOB: ANVAR

Anvar — yosh amaldor. U xonning ishonchli odami edi. Lekin u xondan farq qilardi — u adolatli edi.

Anvar Ranoni ko'rdi. U ham qizning go'zalligiga hayratlandi. Lekin u qizning ko'zlaridagi g'amni ham ko'rdi.

Ular bir-birlari bilan gaplasha boshladilar. Avvaliga ehtiyotkorlik bilan, keyin ochiqroq.

"Siz xursand emassiz," dedi Anvar bir kuni.

"Kim bu yerda xursand bo'ladi?" dedi Rano.

Anvar jim qoldi. U Ranonning so'zlarida haqiqatni ko'rdi.

BESHINCHI BOB: SEVGI

Kunlar o'tdi. Anvar va Rano ko'proq uchrasha boshladilar. Ular bir-birlarini sevib qoldilar.

Bu xavfli sevgi edi. Xonning xorimini sevish — o'limga teng. Lekin ular to'xtay olmadilar.

"Biz qochishimiz kerak," dedi Anvar bir kuni.

"Qayerga?" so'radi Rano.

"Buxoroga. U yerda bizni hech kim tanimaydi."

Rano o'ylandi. Qochish — qiyin ish. Lekin bu yerda qolish — ham qiyin.

"Xo'p," dedi u. "Qochaylik."

OLTINCHI BOB: QOCHISH REJASI

Anvar reja tuzdi. U saroydan chiqish yo'llarini o'rgandi. Kechasi qorovullar qachon almashishini bildi.

Ular oyning yo'q kechasini tanladilar. Qorong'i kechada qochish oson.

Anvar ikki ot tayyorladi. Oziq-ovqat, suv oldi. Pulni ham yig'di.

Rano ham tayyorlandi. U oddiy kiyim kiydi. Xorim kiyimlarini tashlab ketdi.

YETTINCHI BOB: QOCHISH

Belgilangan kecha keldi. Oy yo'q edi. Qorong'i tun.

Anvar Ranoni kutdi. Rano keldi. Ular bir-birlarini quchoqladilar.

"Tayyor?" so'radi Anvar.

"Ha," dedi Rano.

Ular otlarga mindilar. Sekin-sekin saroydan chiqdilar. Qorovullar uxlayotgan edi.

Shahardan chiqqach, otlarni yugurtirdilar. Tezroq ketish kerak edi. Ertalabgacha ko'p yo'l bosish kerak.

SAKKIZINCHI BOB: TA'QIB

Ertalab saroy g'alayonga tushdi. Rano yo'qolgan edi. Anvar ham yo'q.

Xon g'azablandi. U askarlarni yubordi.

"Topinglar!" dedi u. "O'liq yoki tirik — topinglar!"

Askarlar otlandi. Ular Buxoro yo'lidan ketdilar. Qochuvchilarni ta'qib qildilar.

Anvar va Rano tez ketayotgan edi. Lekin askarlarning otlari tezroq edi.

Bir kun o'tdi. Ikki kun o'tdi. Uchinchi kuni askarlar yaqinlashdi.

TO'QQIZINCHI BOB: JANG

Anvar askarlarni ko'rdi. Ular yaqin edi. Qochib bo'lmaydi.

"Rano, sen ketaver," dedi u. "Men ularni to'xtataman."

"Yo'q!" dedi Rano. "Men sensiz ketmayman!"

Lekin Anvar uni majburladi.

"Ketaver! Buxoroda kutaman."

Rano yig'lab ketdi. Anvar esa askarlar bilan jang qildi.

U yaxshi qilichboz edi. Bir necha askerni yiqitdi. Lekin ular ko'p edi.

Anvar jarohat oldi. U yerga yiqildi. Askarlar uni ushladi.

O'NINCHI BOB: ZINDON

Anvarni Qo'qonga qaytardilar. Uni xon oldiga olib keldilar.

Xon g'azab bilan qaradi.

"Sen xoin," dedi u. "Mening xorimni o'g'irlamoqchi bo'lding."

Anvar jim turdi. U hech narsa demadi.

"Zindonga!" buyurdi xon. "U yerda chirib ketsin."

Anvarni zindonga tashladilar. Qorong'i, nam zindon. Kalamushlar yugurib yurardi.

O'N BIRINCHI BOB: RANO BUXORODA

Rano Buxoroga yetib keldi. U bir karvonsaroyda to'xtadi. Anvarni kutdi.

Bir kun o'tdi. Bir hafta o'tdi. Bir oy o'tdi. Anvar kelmadi.

Rano hamma narsani tushundi. Anvar ushlangan. Balki o'ldirilgan.

U yig'ladi. Kunlar, tunlar yig'ladi. Lekin yig'lash foyda bermadi.

U qaror qildi — Anvarni qutqarish kerak. Yoki uning o'limidan qasos olish kerak.

O'N IKKINCHI BOB: REJA

Rano reja tuza boshladi. U Qo'qonga qaytishi kerak edi. Lekin qanday?

U erkak kiyimini kiydi. Sochlarini kesdi. Endi u yigitga o'xshardi.

U savdogar bo'lib ko'rindi. Mato sotadigan savdogar.

Rano Qo'qonga jo'nadi. Bu xavfli edi. Lekin u qo'rqmadi.

O'N UCHINCHI BOB: QO'QONGA QAYTISH

Rano Qo'qonga yetib keldi. U bozorda mato sotdi. Hech kim uni tanmadi.

U zindon haqida so'radi. Zindon qayerda? Qorovullar kim?

Sekin-sekin ma'lumot to'pladi. Anvar hali tirik edi. Zindonda yotibdi.

Rano rejasini tuza boshladi. Anvarni qutqarish kerak.

O'N TO'RTINCHI BOB: QOROVULLAR

Zindon qorovullari — ikki kishi. Ular navbatma-navbat turardi.

Bir qorovul — keksa odam. U ko'p uxlardi. Ikkinchi qorovul — yosh yigit. U aroq ichardi.

Rano yosh qorovulni tanladi. U bilan do'stlashdi.

"Xo'sh, qanday ish?" so'rardi u.

"Zerikarli," derdi qorovul. "Zindon qorovulligi — qiyin ish."

Rano unga aroq olib keldi. Qorovul mast bo'ldi.

O'N BESHINCHI BOB: QUTQARISH

Bir kecha qorovul juda mast bo'ldi. U uxlab qoldi.

Rano kalitlarni oldi. U zindon eshigini ochdi. Ichkariga kirdi.

Qorong'i edi. U chiroq yoqdi. Anvarni izladi.

Va topdi. Anvar karavotda yotardi. U juda ozg'in edi. Jarohatlar bitgan, lekin kuchsiz edi.

"Anvar!" shivirladi Rano.

Anvar ko'zini ochdi. U Ranoni tanimadi.

"Men — Rano," dedi qiz.

Anvar hayratdan yig'lab yubordi.

"Rano? Bu — sen?"

O'N OLTINCHI BOB: QOCHISH

Ular zindondad chiqdilar. Qorovul hamon uxlayotgan edi.

Rano ikki ot tayyorlab qo'ygan edi. Ular otlarga mindilar.

Bu safar ular boshqa yo'ldan ketdilar. Buxoroga emas, Samarqandga.

Ular tezda ketdilar. Bu safar ularni hech kim ta'qib qilmadi. Chunki hech kim bilmadi.

O'N YETTINCHI BOB: SAMARQAND

Samarqand — qadimiy shahar. Amir Temur shahri. Bu yerda ajoyib me'morchilik bor edi.

Anvar va Rano Samarqandda yangi hayot boshladilar. Ular nikohlandilar.

Anvar savdo bilan shug'ullandi. Rano uy bekasi bo'ldi. Ular baxtli edilar.

O'N SAKKIZINCHI BOB: XOTIMA

Yillar o'tdi. Anvar va Rano oila qurdilar. Bolalari bo'ldi.

Ular hech qachon Qo'qonga qaytmadilar. U yerda xon hamon hukmronlik qilardi.

Lekin bir kun xonlik qulab tushdi. Ruslar keldi. Xon taxtdan tushirildi.

Anvar bu xabarni eshitib, kuldi.

"Zulmkor o'z jazosini topdi," dedi u.

Rano ham kuldi. Ular nihoyat erkin edilar.

"Mehrobdan chayon" romani — Abdulla Qodiriyning ikkinchi asari. Bu roman zulm va adolat haqida. Sevgi va kurash haqida.

Rano — kuchli ayol. U o'z sevgisi uchun kurashdi. Va g'alaba qozondi.

Bu roman bizga o'rgatadi — hech qachon taslim bo'lma. Kurash. Va g'alaba qozonasan.

TAMOM.`,
    downloadUrl: "https://kitob.uz/mehrobdan-chayon",
  },
  {
    id: "3",
    title: "Kecha va kunduz",
    author: "Cho'lpon",
    cover: "/uzbek-novel-kecha-va-kunduz-night-day-artistic-boo.jpg",
    description: "XX asr boshlarida o'zbek ayollarining ahvoli haqida roman.",
    category: "Klassik adabiyot",
    pages: 0,
    year: 1936,
    language: "O'zbek",
    content: `BIRINCHI QISM: KECHA

BIRINCHI BOB: ZEBINISO

Zebiniso — yigirma yoshli qiz. U Toshkentda yashaydi. Uning otasi — boy savdogar. Onasi — uy bekasi.

Zebiniso chiroyli qiz edi. Lekin undan ham muhimi — u aqlli edi. U kitob o'qishni sevardi. Yashirincha gazeta ham o'qirdi.

O'sha zamonda qizlar o'qimasligi kerak edi. Ular faqat uy ishlarini bilishi kerak. Lekin Zebiniso boshqacha edi.

U dunyoni bilmoqchi edi. Hayot nima? Erkinlik nima? Adolat nima?

IKKINCHI BOB: PARANJI

Zebiniso paranji kiyishi kerak edi. Bu urf-odat edi. Ayollar yuzini yopishi kerak.

Zebiniso paranjini yoqtirmasdi. U buning ma'nosini tushunmasdi.

"Nega ayollar yuz yopishi kerak?" so'rardi u onasidan.

"Shunday bo'lishi kerak," derdi onasi. "Urf-odat."

Lekin Zebiniso bunday javobdan qoniqmasdi. U boshqa javob qidirdi.

UCHINCHI BOB: MAKTAB

Toshkentda yangi maktab ochildi. Bu — qizlar maktabi edi. Rus hukumati ochgan.

Zebiniso bu haqda eshitdi. U maktabga bormoqchi bo'ldi. Lekin otasi yo'q dedi.

"Qizlar maktabga bormaydi," dedi otasi. "Bu — bizning urf-odatimizga zid."

Zebiniso yig'ladi. Lekin otasini ko'ndira olmadi.

TO'RTINCHI BOB: AKMAL

Akmal — Zebinisoning qo'shnisi. U yigirma besh yoshda edi. U maktabda o'qituvchi bo'lib ishlardi.

Akmal ilg'or fikrli yigit edi. U o'zgarishlarni xohlardi. Ayollar erkinligini qo'llab-quvvatlardi.

Akmal Zebinisoni ko'rdi. U qizning aqliga hayratlandi. Ular gaplasha boshladilar.

"Sen maktabga borishni xohlaysanmi?" so'radi Akmal.

"Ha," dedi Zebiniso. "Lekin otam ruxsat bermaydi."

"Men senga kitob olib kelaman," dedi Akmal. "O'zing o'qiysan."

BESHINCHI BOB: KITOBLAR

Akmal Zebinisoga kitoblar olib keldi. Har xil kitoblar — tarix, adabiyot, fan.

Zebiniso bularni o'qidi. U ko'p narsalarni o'rgandi. Dunyo haqida, odamlar haqida.

U yangi g'oyalar bilan tanishdi. Erkinlik, tenglik, adolat. Bu so'zlar uning qalbiga chuqur kirdi.

Zebiniso o'zgara boshladi. U endi oldingi qiz emas edi.

OLTINCHI BOB: SEVGI

Akmal va Zebiniso ko'proq uchrasha boshladilar. Ular kitoblar haqida gaplashdilar. Hayot haqida, kelajak haqida.

Ular bir-birlarini sevib qoldilar. Bu sevgi — fikrlar birligi edi. Ular bir xil narsalarni xohlardi.

"Men seni sevaman," dedi Akmal bir kuni.

Zebiniso qizardi.

"Men ham seni sevaman," dedi u.

YETTINCHI BOB: TO'SIQ

Lekin ularning sevgisi oldida to'siq bor edi. Zebinisoning otasi boshqa kuyov topgan edi.

Mirzakarim — boy savdogar. U qirq yoshda edi. Uning uch xotini bor edi. Endi to'rtinchi xotin olmoqchi.

Zebinisoning otasi rozilashgan edi. Ko'p mahr olgan edi.

"Sen Mirzakarimga tegasan," dedi otasi Zebinisoga.

"Yo'q!" dedi Zebiniso. "Men uni tanmayman!"

"Sening roziliging kerak emas," dedi otasi. "Men qaror qildim."

SAKKIZINCHI BOB: QOCHISH

Zebiniso Akmalga aytdi. Akmal g'azablandi.

"Biz qochishimiz kerak," dedi u.

"Qayerga?" so'radi Zebiniso.

"Samarqandga. U yerda yangi hayot boshlaymiz."

Zebiniso o'ylandi. Qochish — qiyin qaror. Lekin Mirzakarimga tegish — yanada qiyin.

"Xo'p," dedi u. "Qochaylik."

TO'QQIZINCHI BOB: TUNGI QOCHISH

Ular kechasi qochdilar. Zebiniso paranjini tashlab ketdi. U boshini ochiq qildi.

"Endi men erkinman," dedi u.

Ular poezda Samarqandga jo'nadilar. Bu yangi hayotning boshlanishi edi.

IKKINCHI QISM: KUNDUZ

O'NINCHI BOB: YANGI HAYOT

Samarqandda Akmal va Zebiniso yangi hayot boshladilar. Ular nikohlandilar.

Akmal maktabda ishlay boshladi. Zebiniso ham o'qituvchi bo'ldi. Ayollar maktabida.

Zebiniso ayollarga o'qish-yozishni o'rgatdi. Ular ham bilimga chanqoq edilar.

O'N BIRINCHI BOB: FAOLIYAT

Zebiniso faol bo'lib qoldi. U ayollar huquqlari uchun kurashdi. Yig'ilishlarda nutq so'zladi.

"Ayollar — erkaklar bilan teng," derdi u. "Biz ham o'qishimiz kerak. Biz ham ishlashimiz kerak."

Ko'p ayollar uni qo'llab-quvvatladilar. Lekin ba'zilar qarshi edilar.

"Bu — urf-odatga zid," dedilar ular. "Ayollar uyda o'tirishi kerak."

Zebiniso ularga javob berdi:

"Urf-odatlar o'zgaradi. Vaqt o'zgaradi. Biz ham o'zgarishimiz kerak."

O'N IKKINCHI BOB: DUSHMANLAR

Zebinisoning dushmanlari ham bor edi. Eski fikrli odamlar uni yoqtirmasdi.

Ular Zebinisoni tahdid qildilar. "To'xta, bo'lmasa..." dedilar.

Lekin Zebiniso to'xtamadi. U o'z ishini davom ettirdi.

"Men qo'rqmayman," dedi u. "Haqiqat uchun kurashaman."

O'N UCHINCHI BOB: MAKTAB

Zebinisoning maktabi o'sdi. Endi unda ko'p o'quvchilar bor edi. Ayollar, qizlar — hammasi o'qishni xohlardi.

Zebiniso ularga o'qish-yozishni o'rgatdi. Matematika, tarix, adabiyot ham o'rgatdi.

"Bilim — kuch," derdi u. "Bilimli odam — erkin odam."

O'N TO'RTINCHI BOB: BOLALAR

Akmal va Zebinisoning bolalari bo'ldi. Ikki o'g'il, bir qiz.

Zebiniso bolalarini ilg'or ruhda tarbiyaladi. Ular o'qidilar, bilim oldilar.

"O'g'il va qiz — teng," dedi Zebiniso. "Hamma o'qishi kerak."

O'N BESHINCHI BOB: YILLAR

Yillar o'tdi. Hayot o'zgardi. Yangi davlat qurildi.

Ayollar erkinlik oldilar. Paranji tashlab qo'yildi. Maktablar ko'paydi.

Zebiniso bu o'zgarishlarni ko'rdi. U baxtli edi.

"Biz kurashganmiz," dedi u. "Va g'alaba qozonganmiz."

O'N OLTINCHI BOB: XOTIMA

Zebiniso uzoq umr ko'rdi. U ko'p ishlar qildi. Ko'p ayollarga yordam berdi.

Uning nomi tarixda qoldi. U — o'zbek ayollar harakatining asoschisi.

"Kecha va kunduz" romani — Cho'lponning buyuk asari. Bu roman o'zbek ayollarining kurashi haqida.

Zebiniso — kuchli ayol. U o'z erkinligi uchun kurashdi. Va boshqa ayollarga ham erkinlik olib keldi.

Bu roman bizga o'rgatadi — kurash. O'zgarish uchun kurash. Erkinlik uchun kurash.

Kecha — qorong'i edi. Kunduz — yorug' bo'ldi. Kelajak — bizning qo'limizda.

TAMOM.`,
    downloadUrl: "https://kitob.uz/kecha-va-kunduz",
  },
  {
    id: "4",
    title: "Boburnoma",
    author: "Zahiriddin Muhammad Bobur",
    cover: "/mughal-emperor-babur-memoir-boburnoma-historical-m.jpg",
    description: "Buyuk sarkarda va shoir Boburning o'z hayoti haqidagi xotiralari.",
    category: "Tarixiy",
    pages: 0,
    year: 1530,
    language: "O'zbek",
    content: `MUQADDIMA

Men — Zahiriddin Muhammad Bobur. Amir Temurning avlodiman. Farg'ona hukmdorining o'g'liman. Bu kitobda men o'z hayotimni yozaman.

Men ko'p narsalarni ko'rdim. Ko'p joylarga bordim. Ko'p janglar qildim. Hammasi shu kitobda.

BIRINCHI BOB: BOLALIK

Men hijriy 888-yilda tug'ildim (milodiy 1483). Andijon shahrida tug'ildim. Otam — Umarshayx Mirzo, Farg'ona hukmdori.

Otam meni juda sevardi. U menga ilm o'rgatdi. Qur'on o'qishni, arab tilini, fors tilini o'rgatdi.

Men yoshligimdan ot minishni, qilich o'ynashni o'rgandim. Ovga borardim. Otam bilan birga.

Hayot yaxshi edi. Lekin bu uzoq davom etmadi.

IKKINCHI BOB: TAXTGA CHIQISH

Men o'n ikki yoshda edim. Otam vafot etdi. U kabutarxonadan yiqilib tushdi.

Men taxtga chiqdim. O'n ikki yoshda — Farg'ona hukmdori. Bu juda qiyin edi.

Atrofimda dushmanlar ko'p edi. Amakivachchalarim taxtni xohlardi. Ular menga hujum qildilar.

Men yosh edim, lekin qo'rqmadim. Men kurashardim.

UCHINCHI BOB: SAMARQAND

Men Samarqandni xohladim. Bu — Amir Temurning shahri. Men uning avlodiman. Samarqand meniki bo'lishi kerak.

Men lashkar to'pladim. Samarqandga yurdim. Shaharni qamal qildim.

Yetti oy qamal davom etdi. Nihoyat shahar tushdi. Men Samarqandga kirdim.

Bu — eng baxtli kunim edi. Men Amir Temurning taxtida o'tirdim.

TO'RTINCHI BOB: YO'QOTISH

Lekin baxt uzoq davom etmadi. Men Samarqandda turganim uchun, Farg'onani yo'qotdim.

Amakivachcham Farg'onani oldi. Endi men ikki shaharni ham yo'qotdim.

Men juda oz odamlar bilan qoldim. Dushmanlar hamma yoqda edi.

Bu — eng qiyin davr edi. Lekin men taslim bo'lmadim.

BESHINCHI BOB: SARGARDONLIK

Men bir necha yil sargardon bo'ldim. Bir joydan ikkinchi joyga yurdim. Qishda sovuqda, yozda issiqda.

Ba'zan non topmasdan kunlar o'tdi. Ba'zan bir necha kishi bilan qoldim.

Lekin men umid yo'qotmadim. Men bilardim — bir kun g'alaba qozonaman.

OLTINCHI BOB: KOBUL

Men Kabulga keldim. Bu — chiroyli shahar. Tog'lar orasida joylashgan.

Men Kabulni oldim. Bu — yangi boshlanish edi. Kobul — mening yangi vatanimim.

Men bu yerda ko'p yil yashadim. Shaharni obod qildim. Bog'lar barpo qildim.

Kobulning havosi yaxshi. Mevalari shirin. Men bu shaharni sevdim.

YETTINCHI BOB: HINDISTONGA YURISH

Men Hindistonni eshitgan edim. Bu — boy mamlakat. Oltin, kumush, javohirlar ko'p.

Men Hindistonga yurishga qaror qildim. Katta lashkar to'pladim.

Biz tog'larni oshib o'tdik. Cho'llarni kesib o'tdik. Ko'p qiyinchiliklarni yengdik.

SAKKIZINCHI BOB: PONIPAR JANGI

Ponipar — Hindistondagi jang maydoni. Bu yerda men Ibrohim Lo'diy bilan jang qildim.

Lo'diyning lashkari katta edi — yuz ming kishi, ming fil. Mening lashkarim — o'n ikki ming kishi.

Lekin menda to'plar bor edi. Yangi qurol — o'tli qurol.

Jang boshlandi. To'plar gumburladi. Fillar qo'rqib, orqaga qaytdi. Lo'diyning lashkari tarqaldi.

Men g'alaba qozondim. Hindiston meniki bo'ldi.

TO'QQIZINCHI BOB: DEHLI

Men Dehlga kirdim. Bu — Hindistonning poytaxti. Katta, boy shahar.

Men taxtga o'tirdim. Endi men — Hindiston hukmdori. Bobur podshoh.

Lekin ishlar ko'p edi. Mamlakat katta. Boshqarish qiyin.

O'NINCHI BOB: HINDISTON

Hindiston — ajoyib mamlakat. Iqlimi issiq. Daryolari ko'p. Yerlar hosildor.

Lekin Hindiston Farg'onaga o'xshamaydi. Mevalar boshqa. Havo boshqa. Odamlar boshqa.

Men ba'zan vatanimni sog'indim. Farg'onaning salqin havosini. Samarqandning ko'k gumbazlarini.

O'N BIRINCHI BOB: BOG'LAR

Men bog'larni sevaman. Har yerda bog' barpo qildim. Kobulda, Dehlida, Agroda.

Bog'larni o'zim loyihaladim. Qayerda daraxт, qayerda gul — hammasi mening rejam bo'yicha.

Kabulda "Bog'i Vafodorlik" barpo qildim. Bu — eng sevimli bog'im.

O'N IKKINCHI BOB: SHE'RIYAT

Men she'r yozishni sevaman. Turkiy tilda, forsiy tilda she'rlar yozdim.

Men g'azallar yozdim. Sevgi haqida, tabiat haqida, hayot haqida.

She'r — qalbning ko'zgusi. Men she'rlarimda o'z his-tuyg'ularimni ifodaladim.

O'N UCHINCHI BOB: OILAM

Mening bir necha xotinim bor edi. Ko'p farzandlarim bo'ldi.

Eng katta o'g'lim — Humoyun. U mening vorısim. U ham men kabi hukmdor bo'ladi.

Men farzandlarimni sevardim. Ularga ilm o'rgatdim. Hukmdorlikni o'rgatdim.

O'N TO'RTINCHI BOB: BETOBLIK

Men ko'p marta kasal bo'ldim. Hindistonning iqlimi menga qiyin edi.

Bir marta juda og'ir kasal bo'ldim. Humoyun ham kasal edi.

Men Xudoga yolvordim: "Mening jonimni ol, o'g'limni qutqar."

Va ajoyib narsa bo'ldi — Humoyun tuzaldi. Lekin men kasallana boshladim.

O'N BESHINCHI BOB: SO'NGGI KUNLAR

Men bilaman — umrim tugayapti. Hindistondan qaytolmayman. Vatanimni ko'rolmayman.

Lekin men afsuslanayman. Men ko'p ishlar qildim. Katta davlat qurdim.

Mening avlodlarim bu davlatni boshqaradi. Bobur sulolasi — buyuk sulola.

XOTIMA

Men — Bobur. Hukmdor, sarkarda, shoir.

Men hayotda ko'p narsalarni ko'rdim. G'alabalar va mag'lubiyatlar. Baxt va g'am.

Bu kitob — mening hayotim. Men hamma narsani yozdim. Yaxshisini ham, yomonini ham.

Men o'g'limga aytaman: Odil bo'l. Xalqingga g'amxo'rlik qil. Ilmni sev.

Bu — mening vasiyatim.

TAMOM.`,
    downloadUrl: "https://kitob.uz/boburnoma",
  },
  {
    id: "5",
    title: "Devoni Foniy",
    author: "Alisher Navoiy",
    cover: "/alisher-navoi-poetry-devoni-foniy-classical-persia.jpg",
    description: "Alisher Navoiyning forsiy tilidagi she'rlar to'plami.",
    category: "She'riyat",
    pages: 0,
    year: 1498,
    language: "O'zbek",
    content: `MUQADDIMA

Men — Alisher Navoiy. Mening she'riy taxallusim — Navoiy. Fors tilida esa Foniy deb yozaman.

"Foniy" — o'tkinchi, yo'q bo'ladigan degani. Chunki bu dunyo foniydur, faqat Xudo boqiydur.

Bu devonda mening forsiy she'rlarim to'plangan. G'azallar, ruboiylar, qit'alar.

BIRINCHI G'AZAL

Agar seni ko'rmasam bir kun,
Ko'zlarim yoshga to'lar.
Sening husning ko'rgani,
Dilim mushtoq bo'lar.

Sen — oysan, men — zarra,
Sen — quyosh, men — soya.
Sen — gulsan, men — bulbul,
Sening vasling — orzu.

Kechalar uxlamayman,
Seni o'ylab yotaman.
Tushlarimda ko'raman,
Uyg'onsam — yo'q bo'lasan.

IKKINCHI G'AZAL

Ishq — olovdir, yoqadi,
Yurakni kuydirar.
Ishq — darddir, qiynaydi,
Lekin shifo berar.

Oshiq bo'lgan odam,
Dunyoni unutar.
Faqat sevgini bilur,
Boshqa hech narsani.

Men ham oshiqman,
Sening husningga.
Jonim fidodir,
Sening ishqingga.

UCHINCHI G'AZAL

Bahor keldi, gullar ochildi,
Bulbullar sayradi.
Bog'lar yashil libos kiydi,
Dunyo jannat bo'ldi.

Lekin sensen yo'q,
Bahor menga qish.
Gulsiz, bulbulsiz,
Hayot menga tish.

Kel, ey dilbar,
Bahorimni qil.
Sening kelishing —
Mening hayotim.

TO'RTINCHI G'AZAL

Ilm — eng katta boylik,
Ilm — eng yorug' nur.
Ilmli odam — boy,
Ilmsiz odam — qashshoq.

Men umrim bo'yi o'rgandim,
Men umrim bo'yi o'qidim.
Kitob — mening do'stim,
Qalam — mening qurolim.

Ilm o'rgan, ey farzand,
Ilm — sening kelajaking.
Ilmli bo'lsang — hurmatli,
Ilmsiz bo'lsang — xor.

BESHINCHI G'AZAL

Do'stlik — buyuk ne'mat,
Do'st — qimmatli xazina.
Do'stsiz odam — yolg'iz,
Do'stli odam — boy.

Mening ko'p do'stlarim bor,
Hammasi aziz menga.
Ular bilan suhbat —
Eng katta baxtim.

Do'stga sadoqatli bo'l,
Do'stni hech qachon unutma.
Do'stlik — muqaddas,
Do'stlik — buyuk ne'mat.

OLTINCHI G'AZAL

Vatan — ona,
Vatan — beshik.
Vatansiz odam —
Yetim bola.

Men vatanimni sevaman,
Hirotni, Samarqandni.
Bu yerlarning tuprog'i —
Menga oltindan aziz.

Vatan uchun jon beraman,
Vatan uchun kurashaman.
Vatan — mening hayotim,
Vatan — mening borliqim.

YETTINCHI G'AZAL

Kuz keldi, barglar to'kildi,
Daraxtlar yalang'och.
Qushlar uchib ketdi,
Havo sovuq bo'ldi.

Kuz — hayotning ramzi,
Hamma narsa o'tar.
Yoshlik ham o'tar,
Hayot ham o'tar.

Lekin ruh o'lmaydi,
Ruh — abadiy.
Tana — foniy,
Ruh — boqiy.

SAKKIZINCHI G'AZAL

Sabr — eng katta fazilar,
Sabr — g'alabaning kaliti.
Sabrli odam — g'olib,
Sabrsiz odam — mag'lub.

Hayotda qiyinchiliklar ko'p,
Har kuni yangi sinov.
Sabrli bo'l, bardosh ber,
Oxirida g'alaba seniki.

Men ham sabr qildim,
Ko'p qiyinchiliklarni yengdim.
Sabr — mening qurolim,
Sabr — mening kuchim.

TO'QQIZINCHI G'AZAL

Adolat — eng muhim narsa,
Adolatsiz hayot — zulm.
Odil bo'l, ey inson,
Adolat — sening burchang.

Hukmdorlar odil bo'lsin,
Qozilar odil bo'lsin.
Har bir inson odil bo'lsin,
Dunyo adolatli bo'lsin.

Men adolatni sevaman,
Zulmni yomon ko'raman.
Adolat uchun kurashaman,
Zulm bo'lmasin.

O'NINCHI G'AZAL

Saxiylik — go'zal xislat,
Saxiy odam — yaxshi odam.
Baxillik — yomon xislat,
Baxil odam — qashshoq.

Berib yasha, olib emas,
Saxiy bo'l, baxil bo'lma.
Saxiylikda baxt bor,
Baxillikda g'am bor.

Men saxiy bo'lishga harakat qilaman,
Qo'limdan kelganini beraman.
Saxiylik — mening yo'lim,
Saxiylik — mening hayotim.

XOTIMA

"Devoni Foniy" — Navoiyning forsiy she'rlari. Lekin Navoiy o'zbek tiliga ko'proq ahamiyat bergan.

Navoiy aytadi: "Turkiy til — go'zal til. U fors tilidan kam emas."

Navoiy o'zbek adabiyotining otasi. U bizga til, adabiyot, ma'naviyat qoldirdi.

TAMOM.`,
    downloadUrl: "https://kitob.uz/devoni-foniy",
  },
  {
    id: "6",
    title: "Alpomish",
    author: "Xalq dostonlari",
    cover: "/uzbek-epic-hero-alpomish-folk-tale-warrior-book-co.jpg",
    description: "O'zbek xalq qahramonlik dostoni.",
    category: "Xalq og'zaki ijodi",
    pages: 0,
    year: 1500,
    language: "O'zbek",
    content: `KIRISH

Alpomish dostoni — o'zbek xalqining eng mashhur dostonlaridan biri. Bu doston qahramonlik, sevgi, sadoqat haqida.

Alpomish — kuchli bahodir. U yovuz kuchlar bilan kurashadi. U o'z xalqini himoya qiladi.

BIRINCHI QISM: ALPOMISHNING TUG'ILISHI

Qadim zamonlarda Qo'ng'irot elida Boybo'ri degan boy yashardi. Uning mol-mulki ko'p edi, lekin farzandi yo'q edi.

Boybo'ri Xudoga yolvordi: "Ey Xudo, menga farzand ber. Men butun mol-mulkimni sadaqa qilaman."

Xudo uning duosini qabul qildi. Boybo'rining xotini homilador bo'ldi.

Va nihoyat, o'g'il tug'ildi. Uni Alpomish deb atashdi. "Alp" — bahodir degani.

Alpomish tug'ilgandan kuchli edi. U har bir boladan katta, har bir boladan kuchli edi.

IKKINCHI QISM: ALPOMISHNING YOSHLIGI

Alpomish o'sdi. U har qanday ishni tez o'rgandi. Ot minishni, qilich o'ynashni, kamon otishni.

O'n yoshida u kattalardan ham kuchli edi. Polvonar olishuvda hech kim uni yenga olmasdi.

Alpomishning oti ham bor edi — Boychibor. Bu ot ham oddiy ot emas edi. U shamoldek tez, sherdek kuchli edi.

Alpomish va Boychibor hamma joyga birga borardi.

UCHINCHI QISM: BARCHINOY

Qo'ng'irot elida yana bir boy yashardi — Boysa'ri. Uning qizi bor edi — Barchinoy.

Barchinoy juda chiroyli qiz edi. Uning go'zalligi haqida butun el bilardi.

Alpomish Barchinoyni ko'rdi. U qizga oshiq bo'ldi.

"Men Barchinoyni olaman," dedi Alpomish. "Boshqa hech kim emas."

Boybo'ri Boysa'riga sovchi yubordi. Boysa'ri rozi bo'ldi. Alpomish va Barchinoy unashtirildi.

TO'RTINCHI QISM: SAFAR

Kunlardan bir kun Boysa'ri qaror qildi — u boshqa elga ko'chmoqchi. Qalmog'lar eliga.

"Nega ketasiz?" so'radilar odamlar.

"U yerda yaylov ko'p," dedi Boysa'ri. "Mol-qo'yga yaxshi."

Boysa'ri oilasi va qo'ylari bilan jo'nadi. Barchinoy ham ketdi.

Alpomish qoldi. U Barchinoyni sog'indi.

BESHINCHI QISM: QALMOG'LAR ELIDA

Boysa'ri Qalmog'lar eliga yetib keldi. Bu el — boshqa odat, boshqa qonun.

Qalmog' xoni — To'ychixon. U Barchinoyni ko'rdi. U ham qizga oshiq bo'ldi.

"Bu qiz meniki bo'ladi," dedi To'ychixon.

"Yo'q," dedi Boysa'ri. "U boshqa yigitga unashgan."

Lekin To'ychixon eshitmadi. U Barchinoyni zo'rlik bilan olmoqchi bo'ldi.

OLTINCHI QISM: ALPOMISH YO'LGA CHIQADI

Alpomishga xabar yetdi — Barchinoyni zo'rlik bilan olmoqchilar.

Alpomish g'azablandi. U Boychiborga mindi. Qalmog'lar eliga jo'nadi.

Yo'l uzoq edi. Tog'lar, cho'llar, daryolar. Lekin Alpomish to'xtamadi.

U faqat bir narsani o'ylardi — Barchinoyni qutqarish.

YETTINCHI QISM: SINOVLAR

Yo'lda Alpomish ko'p sinovlarga duch keldi.

Birinchi sinov — bahaybat dev. Dev Alpomishning yo'lini to'sdi.

"Qaytib ket," dedi dev. "Bo'lmasa o'ldiraman."

Lekin Alpomish qo'rqmadi. U dev bilan olishdi. Uni yengdi.

Ikkinchi sinov — olovli daryo. Daryo suvlari olov kabi yonardi.

Alpomish Boychiborga mindi. Ular daryodan sakrab o'tdilar.

Uchinchi sinov — sehrli o'rmon. O'rmonda yo'l adashardi.

Lekin Boychibor yo'lni topdi. Ular o'rmondan o'tdilar.

SAKKIZINCHI QISM: QALMOG'LAR ELIDA

Alpomish Qalmog'lar eliga yetib keldi. U to'g'ri To'ychixon saroyiga bordi.

"Men — Alpomish," dedi u. "Barchinoyni qaytarib olaman."

To'ychixon kuldi.

"Sen — yolg'iz yigit. Men — katta xon. Qanday qilib meni yengasan?"

"Menga imtihon ber," dedi Alpomish. "Yengsam — Barchinoyni olaman."

To'ychixon rozi bo'ldi. U Alpomishga uch sinov berdi.

TO'QQIZINCHI BOB: UCHTA SINOV

Birinchi sinov — kamondan o'q otish.

Nishon — bir chaqirim narida. Hech kim u yerga yetkazmagan.

Alpomish kamonni tortdi. O'qni otdi. O'q nishonga tegdi.

Hammasi hayratda qoldi.

Ikkinchi sinov — polvonlar bilan olishish.

To'ychixonning eng kuchli polvonlari keldi. Hammasi Alpomish bilan olishdi.

Alpomish hammasini yengdi. Birortasi ham turib qololmadi.

Uchinchi sinov — Boychibor bilan poyga.

To'ychixonning eng tez otlari yugurdi. Lekin Boychibor hammasini o'tib ketdi.

Alpomish g'alaba qozondi.

O'NINCHI QISM: G'ALABA

To'ychixon mag'lub bo'ldi. U va'dasiga ko'ra Barchinoyni berdi.

Alpomish va Barchinoy uchrashdilar. Ular juda baxtli edilar.

"Sen kelding," dedi Barchinoy. "Men kutdim."

"Men har doim kelaman," dedi Alpomish. "Sen uchun."

Ular Qo'ng'irot eliga qaytdilar. Katta to'y bo'ldi.

O'N BIRINCHI QISM: TINCH HAYOT

Alpomish va Barchinoy baxtli hayot boshladilar. Ularning bolalari bo'ldi.

Alpomish el boshlig'i bo'ldi. U xalqiga adolat bilan hukmronlik qildi.

Dushmanlar qo'rqardi. Hech kim Qo'ng'irot eliga hujum qilmadi.

Xalq Alpomishni sevardi. U — ularning qahramoni edi.

XOTIMA

Alpomish dostoni — o'zbek xalqining ruhiy boyligi. Bu doston bizga kuch-quvvat, mardlik, sadoqatni o'rgatadi.

Alpomish — ideal qahramon. U kuchli, aqlli, adolatli. U o'z xalqi uchun kurashadi.

Bu dostodni o'qing, bolalaringizga o'qing. Bu — bizning tarixingiz, bizning madaniyatimiz.

TAMOM.`,
  },
]

export const categories = ["Barchasi", "Klassik adabiyot", "Tarixiy", "She'riyat", "Xalq og'zaki ijodi"]
