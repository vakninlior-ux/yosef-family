/* תמונות וסרטונים */
(function () {
  'use strict';

  var VIDEOS = [
    {
      group: 'סרטונים סלמה יוסף',
      items: [
        { id: '0dmFxEAUkiE', title: 'חיים שכאלה עם סבתא סלמה יוסף מנהריה חלק א 2010' },
        { id: 'eu84hVMTAFE', title: 'חיים שכאלה עם סבתא סלמה יוסף נהריה 2010 חלק ב' },
        { id: 'rb8fV3K36Pk', title: 'סבתא סלמה יוסף 2010' },
        { id: 'okrqUHn0Y0A', title: 'אחיות מדברות' }
      ]
    },
    {
      group: 'בר מצווה אורן יוסף ולירן יוסף',
      items: [
        { id: '8TfISMPmYHQ', title: 'בר מצווה לאורן+לירן יוסף .1' },
        { id: 'Z8yRHPODkgY', title: 'בר מצווה אורן+לירן יוסף. 2' },
        { id: 'OJ5V-6smXi8', title: 'בר מצווה אורן ולירן יוסף.3' }
      ]
    }
  ];

  var PHOTOS = [
    {
      group: 'מסמכים נבחרים',
      folder: 'צילומים נבחרים',
      items: [
        '1953. קבלות תשלומים שונים.jpg',
        '1954 מכתב פיטורים מישאסבסט. אבהרם יוסף.jpg',
        '1955 אישור קבלת דירה שיכון עובדים_01.jpg',
        '1955. חדרה. .jpg',
        '1956.שובר לקפה. בנק הפועלים..jpg',
        '1959. אברהם יוסף. משה יוסף. שי עבור לידת הבן. ישאסבסט.jpg',
        '1959. מיכאל יוסף. תעודה. כתה א.jpg',
        '1959. משה יוסף. תעודת לידה.jpg',
        '1967 מכתב לעיריית נהריה בגין התחשבות בחוב_01.jpg',
        '1969 הרשמה למפעל הזנה_01.jpg',
        '1970. יעקב יוסף. קצין העיר. חייל מילואים 1.jpg',
        '1970. יעקב יוסף. קצין העיר. חייל מילואים 2.jpg',
        '1971. יוסף דוד. חייל. צבא..jpg',
        '1974. מיכאל יוסף. גבריאל יוסף. מכתב לחייל מהמשפחה.jpg',
        '1975. שושנה יוסף. מכתב חולצה .jpg',
        '1975. שושנה יוסף. מכתב תשובה חולצה..jpg',
        '1979 הזמנה למרפאה תעסוקתית אברהם יוסף_01.jpg',
        '1980 דרישת אישורים קצין העיר נהריה_01.jpg',
        'אברהם יוסף. יובל 25 בישאסבסט.jpg',
        'אברהם יוסף. כרטיס ביקור ישאסבסט.jpg',
        'אישור מעסיק. סלמה יוסף. הולמה אלזה..jpg',
        'יעקב יוסף. תעודת 1966. בוחר.jpg',
        'מיכאל יוסף. תועדת 1952. לידה.jpg',
        'נכתב ב 2013 קורות חיים מפי סלמה שרה יוסף. סלמה יוסף. מור יוסף._02.jpg',
        'נכתב ב 2013 קורות חיים מפי סלמה שרה יוסף.סלמה יוסף. מור יוסף._03.jpg',
        'נכתב ב 2013 קורות חיים מפי סלמה שרה יוסף.סלמה יוסף. מור יוסף._04.jpg',
        'נכתב ב 2013 קורות חיים מפי סלמה שרה יוסף.סלמה יוסף.מור יוסף_05.jpg',
        'פיגור תשלום לסוכנות היהודית עבור עלייה לארץ ישראל_01.jpg',
        'צילום פורטרט סלמה שרה יוסף תימן_01.jpg',
        'קבלות תשלומים שונים_06.jpg',
        'קיצבאות משפחתיות דרגת נכות ומסמכים רפואיים אברהם יוסף_02.jpg',
        'קיצבאות משפחתיות דרגת נכות ומסמכים רפואיים אברהם יוסף_03.jpg',
        'קיצבאות משפחתיות דרגת נכות ומסמכים רפואיים אברהם יוסף_04.jpg',
        'קיצבאות משפחתיות דרגת נכות ומסמכים רפואיים אברהם יוסף_05.jpg',
        'קיצבאות משפחתיות דרגת נכות ומסמכים רפואיים אברהם יוסף_06.jpg',
        'קיצבאות משפחתיות דרגת נכות ומסמכים רפואיים אברהם יוסף_07.jpg',
        'קיצבאות משפחתיות דרגת נכות ומסמכים רפואיים אברהם יוסף_08.jpg',
        'קיצבאות משפחתיות דרגת נכות ומסמכים רפואיים אברהם יוסף_09.jpg',
        'קיצבאות משפחתיות דרגת נכות ומסמכים רפואיים אברהם יוסף_10.jpg',
        'קיצבאות משפחתיות דרגת נכות ומסמכים רפואיים אברהם יוסף_11.jpg',
        'קיצבאות משפחתיות דרגת נכות ומסמכים רפואיים אברהם יוסף_12.jpg',
        'קיצבאות משפחתיות דרגת נכות ומסמכים רפואיים אברהם יוסף_13.jpg',
        'קיצבאות משפחתיות דרגת נכות ומסמכים רפואיים אברהם יוסף_14.jpg',
        'קיצבאות משפחתיות דרגת נכות ומסמכים רפואיים אברהם יוסף_15.jpg',
        'קיצבאות משפחתיות דרגת נכות ומסמכים רפואיים אברהם יוסף_16.jpg'
      ]
    },
    {
      group: 'ברכות',
      folder: 'ברכות',
      items: [
        'ברכה לבר מצווה. רדעי יוסף.jpg',
        'ברכות אישיות לחגים_01.jpg','ברכות אישיות לחגים_02.jpg','ברכות אישיות לחגים_03.jpg',
        'ברכות אישיות לחגים_04.jpg','ברכות אישיות לחגים_05.jpg','ברכות אישיות לחגים_06.jpg',
        'ברכות אישיות לחגים_07.jpg','ברכות אישיות לחגים_08.jpg','ברכות אישיות לחגים_09.jpg',
        'ברכות אישיות לחגים_10.jpg',
        'ברכות וגלויות בני המשפחה_01.jpg','ברכות וגלויות בני המשפחה_02.jpg',
        'ברכות וגלויות בני המשפחה_03.jpg','ברכות וגלויות בני המשפחה_04.jpg',
        'ברכות וגלויות בני המשפחה_05.jpg','ברכות וגלויות בני המשפחה_06.jpg',
        'ברכות וגלויות בני המשפחה_07.jpg','ברכות וגלויות בני המשפחה_08.jpg',
        'ברכות וגלויות בני המשפחה_09.jpg','ברכות וגלויות בני המשפחה_10.jpg',
        'ברכות וגלויות בני המשפחה_11.jpg','ברכות וגלויות בני המשפחה_12.jpg',
        'ברכות וגלויות בני המשפחה_13.jpg','ברכות וגלויות בני המשפחה_14.jpg',
        'ברכות וגלויות בני המשפחה_15.jpg','ברכות וגלויות בני המשפחה_16.jpg'
      ]
    },
    {
      group: 'הזמנות לאירועים',
      folder: 'הזמנות לאירועים',
      items: [
        'הזמנות לחתונות ואירועים משפחתיים_01.jpg','הזמנות לחתונות ואירועים משפחתיים_02.jpg',
        'הזמנות לחתונות ואירועים משפחתיים_03.jpg','הזמנות לחתונות ואירועים משפחתיים_04.jpg',
        'הזמנות לחתונות ואירועים משפחתיים_05.jpg','הזמנות לחתונות ואירועים משפחתיים_06.jpg',
        'הזמנות לחתונות ואירועים משפחתיים_07.jpg','הזמנות לחתונות ואירועים משפחתיים_08.jpg',
        'הזמנות לחתונות ואירועים משפחתיים_09.jpg','הזמנות לחתונות ואירועים משפחתיים_10.jpg',
        'הזמנות לחתונות ואירועים משפחתיים_11.jpg','הזמנות לחתונות ואירועים משפחתיים_12.jpg',
        'הזמנות לחתונות ואירועים משפחתיים_13.jpg','הזמנות לחתונות ואירועים משפחתיים_14.jpg',
        'הזמנות לחתונות ואירועים משפחתיים_15.jpg','הזמנות לחתונות ואירועים משפחתיים_16.jpg',
        'הזמנות לחתונות ואירועים משפחתיים_17.jpg','הזמנות לחתונות ואירועים משפחתיים_18.jpg',
        'הזמנות לחתונות ואירועים משפחתיים_19.jpg','הזמנות לחתונות ואירועים משפחתיים_20.jpg',
        'הזמנות לחתונות ואירועים משפחתיים_21.jpg','הזמנות לחתונות ואירועים משפחתיים_22.jpg',
        'הזמנות לחתונות ואירועים משפחתיים_23.jpg','הזמנות לחתונות ואירועים משפחתיים_24.jpg',
        'הזמנות לחתונות ואירועים משפחתיים_25.jpg','הזמנות לחתונות ואירועים משפחתיים_26.jpg',
        'הזמנות לחתונות ואירועים משפחתיים_27.jpg','הזמנות לחתונות ואירועים משפחתיים_28.jpg',
        'הזמנות לחתונות ואירועים משפחתיים_29.jpg','הזמנות לחתונות ואירועים משפחתיים_30.jpg',
        'הזמנות לחתונות ואירועים משפחתיים_31.jpg','הזמנות לחתונות ואירועים משפחתיים_32.jpg'
      ]
    },
    {
      group: 'הכתובה ותרגומה - אברהם וסלמה יוסף',
      folder: 'הכתובה אברהם וסלמה יוסף',
      items: [
        { doc: true, file: 'ketubah_transcription_and_translation.docx', label: 'תעתוק ותרגום הכתובה (Word)' },
        '1939 כתובה סלמה שרה ואברהם יוסף_01.jpg'
      ]
    },
    {
      group: 'הרחבת הבית ביפה נוף',
      folder: 'הרחבת הבית ביפה נוף',
      items: [
        '1958 רישיון בניית תוספת מרפסת וחדר_01.jpg',
        '1958 רישיון בניית תוספת מרפסת וחדר_02.jpg',
        '1958 תכניות הנדסיות מרפסת וחדר יפה נוף _01.jpg',
        '1958 תכניות הנדסיות מרפסת וחדר יפה נוף _02.jpg',
        '1958 תכניות הנדסיות מרפסת וחדר יפה נוף _03.jpg',
        '1958 תכניות הנדסיות מרפסת וחדר יפה נוף _04.jpg',
        '1958 תכניות הנדסיות מרפסת וחדר יפה נוף _05.jpg',
        '1962 1967 מיסים ואישור בנייה מועצה מקומית נהריה_01.jpg',
        '1962 1967 מיסים ואישור בנייה מועצה מקומית נהריה_02.jpg',
        '1962 זכרון דברים בערבית ועברית לבניית מרפסת_03.jpg',
        '1974 היתר בנייה תוספת מרפסת_01.jpg',
        '1974 היתר בנייה תוספת מרפסת_02.jpg',
        '1974 היתר בנייה תוספת מרפסת_03.jpg',
        '1974 תוכנית הנדסית בניית מרפסת.jpg',
        'תוכנית הנדסית הוספת חשמל _01.jpg',
        'תוכנית הנדסית הוספת חשמל _02.jpg',
        'תוכנית הנדסית תוספת מרפסת וחדר_01.jpg',
        'תוכנית הנדסית תוספת מרפסת וחדר_02.jpg'
      ]
    },
    {
      group: 'כתבות ופרסומים על בני המשפחה',
      folder: 'כתבות ופרסומים על בני המשפחה',
      items: [
        'תעודות אישיות וכתבות על בני המשפחה_11.jpg',
        '2017. יעקב יוסף. יקיר החינוך.png'
      ]
    },
    {
      group: 'מסמכי מקרקעין ומשכנתא',
      folder: 'מסמכי מקרקעין ומשכנתא',
      items: [
        '1955 משכנתא_01.jpg','1955 משכנתא_02.jpg',
        '1968 תשלום דמי חכירה כרטסת מחשב ועוד תשלומים רבים משנים רבות_18.jpg',
        '1968 תשלום דמי חכירה כרטסת מחשב ועוד תשלומים רבים משנים רבות_19.jpg',
        '1968 תשלום דמי חכירה כרטסת מחשב ועוד תשלומים רבים משנים רבות_20.jpg',
        '1968 תשלום דמי חכירה כרטסת מחשב ועוד תשלומים רבים משנים רבות_21.jpg',
        '1968 תשלום דמי חכירה כרטסת מחשב ועוד תשלומים רבים משנים רבות_22.jpg',
        'מסמכי מקרקעין ומשכנתא_01.jpg','מסמכי מקרקעין ומשכנתא_02.jpg',
        'מסמכי מקרקעין ומשכנתא_03.jpg','מסמכי מקרקעין ומשכנתא_04.jpg',
        'מסמכי מקרקעין ומשכנתא_05.jpg','מסמכי מקרקעין ומשכנתא_06.jpg',
        'מסמכי מקרקעין ומשכנתא_07.jpg','מסמכי מקרקעין ומשכנתא_08.jpg',
        'מסמכי מקרקעין ומשכנתא_09.jpg','מסמכי מקרקעין ומשכנתא_10.jpg',
        'מסמכי מקרקעין ומשכנתא_11.jpg','מסמכי מקרקעין ומשכנתא_12.jpg',
        'מסמכי מקרקעין ומשכנתא_13.jpg','מסמכי מקרקעין ומשכנתא_14.jpg',
        'מסמכי מקרקעין ומשכנתא_15.jpg','מסמכי מקרקעין ומשכנתא_16.jpg',
        'מסמכי מקרקעין ומשכנתא_17.jpg','מסמכי מקרקעין ומשכנתא_18.jpg',
        'מסמכי מקרקעין ומשכנתא_19.jpg','מסמכי מקרקעין ומשכנתא_20.jpg'
      ]
    },
    {
      group: 'תלושי שכר',
      folder: 'תלושי שכר',
      items: [
        'תלושי שכר וצילום יובל 25 בישאסבסט_04.jpg',
        'תלושי שכר וצילום יובל 25 בישאסבסט_05.jpg',
        'תלושי שכר וצילום יובל 25 בישאסבסט_06.jpg',
        'תלושי שכר וצילום יובל 25 בישאסבסט_07.jpg',
        'תלושי שכר וצילום יובל 25 בישאסבסט_08.jpg',
        'תלושי שכר וצילום יובל 25 בישאסבסט_09.jpg',
        'תלושי שכר וצילום יובל 25 בישאסבסט_10.jpg',
        'תלושי שכר וצילום יובל 25 בישאסבסט_11.jpg'
      ]
    },
    {
      group: 'תשלומים ואישורים שונים',
      folder: 'תשלומים ואישורים שונים',
      items: [
        '1953 אישור למס הכנסה.jpg',
        '1954 אישור מגורים בשיכון עמידר .jpg',
        '1957 ואילך מיסים ופיגורים למועצה מקומית נהריה _01.jpg',
        '1957 ואילך מיסים ופיגורים למועצה מקומית נהריה _02.jpg',
        '1957 ואילך מיסים ופיגורים למועצה מקומית נהריה _03.jpg',
        '1957 ואילך מיסים ופיגורים למועצה מקומית נהריה _04.jpg',
        '1957 ואילך מיסים ופיגורים למועצה מקומית נהריה _05.jpg',
        '1957 ואילך מיסים ופיגורים למועצה מקומית נהריה _06.jpg',
        '1957 ואילך מיסים ופיגורים למועצה מקומית נהריה _07.jpg',
        '1957 ואילך מיסים ופיגורים למועצה מקומית נהריה _08.jpg',
        '1957 ואילך מיסים ופיגורים למועצה מקומית נהריה _09.jpg',
        '1957 ואילך מיסים ופיגורים למועצה מקומית נהריה _10.jpg',
        '1962 1967 מיסים ואישור בנייה מועצה מקומית נהריה_03.jpg',
        '1962 1967 מיסים ואישור בנייה מועצה מקומית נהריה_04.jpg',
        '1962 1967 מיסים ואישור בנייה מועצה מקומית נהריה_05.jpg',
        '1962 1967 מיסים ואישור בנייה מועצה מקומית נהריה_06.jpg',
        '1962 1967 מיסים ואישור בנייה מועצה מקומית נהריה_07.jpg',
        '1962 זכרון דברים בערבית ועברית לבניית מרפסת_01.jpg',
        '1962 זכרון דברים בערבית ועברית לבניית מרפסת_02.jpg',
        '1965 פיגור תשלום לסוכנות היהודית עבור עלייה לארץ ישראל_01.jpg',
        '1965 פיגור תשלום לסוכנות היהודית עבור עלייה לארץ ישראל_02.jpg',
        '1965 פיגור תשלום לסוכנות היהודית עבור עלייה לארץ ישראל_03.jpg',
        '1965 פיגור תשלום לסוכנות היהודית עבור עלייה לארץ ישראל_04.jpg',
        '1965 פיגור תשלום לסוכנות היהודית עבור עלייה לארץ ישראל_05.jpg',
        '1965 פיגור תשלום לסוכנות היהודית עבור עלייה לארץ ישראל_06.jpg',
        '1968 תשלום דמי חכירה כרטסת מחשב ועוד תשלומים רבים משנים רבות_01.jpg',
        '1968 תשלום דמי חכירה כרטסת מחשב ועוד תשלומים רבים משנים רבות_02.jpg',
        '1968 תשלום דמי חכירה כרטסת מחשב ועוד תשלומים רבים משנים רבות_03.jpg',
        '1968 תשלום דמי חכירה כרטסת מחשב ועוד תשלומים רבים משנים רבות_04.jpg',
        '1968 תשלום דמי חכירה כרטסת מחשב ועוד תשלומים רבים משנים רבות_05.jpg',
        '1968 תשלום דמי חכירה כרטסת מחשב ועוד תשלומים רבים משנים רבות_06.jpg',
        '1968 תשלום דמי חכירה כרטסת מחשב ועוד תשלומים רבים משנים רבות_07.jpg',
        '1968 תשלום דמי חכירה כרטסת מחשב ועוד תשלומים רבים משנים רבות_08.jpg',
        '1968 תשלום דמי חכירה כרטסת מחשב ועוד תשלומים רבים משנים רבות_09.jpg',
        '1968 תשלום דמי חכירה כרטסת מחשב ועוד תשלומים רבים משנים רבות_10.jpg',
        '1968 תשלום דמי חכירה כרטסת מחשב ועוד תשלומים רבים משנים רבות_11.jpg',
        '1968 תשלום דמי חכירה כרטסת מחשב ועוד תשלומים רבים משנים רבות_12.jpg',
        '1968 תשלום דמי חכירה כרטסת מחשב ועוד תשלומים רבים משנים רבות_13.jpg',
        '1968 תשלום דמי חכירה כרטסת מחשב ועוד תשלומים רבים משנים רבות_14.jpg',
        '1968 תשלום דמי חכירה כרטסת מחשב ועוד תשלומים רבים משנים רבות_15.jpg',
        '1968 תשלום דמי חכירה כרטסת מחשב ועוד תשלומים רבים משנים רבות_16.jpg',
        'חשבונות חשמל ומים ביטוח טלויזיה_01.jpg','חשבונות חשמל ומים ביטוח טלויזיה_02.jpg',
        'חשבונות חשמל ומים ביטוח טלויזיה_03.jpg','חשבונות חשמל ומים ביטוח טלויזיה_04.jpg',
        'חשבונות חשמל ומים ביטוח טלויזיה_05.jpg','חשבונות חשמל ומים ביטוח טלויזיה_06.jpg',
        'חשבונות חשמל ומים ביטוח טלויזיה_07.jpg','חשבונות חשמל ומים ביטוח טלויזיה_08.jpg',
        'חשבונות חשמל ומים ביטוח טלויזיה_09.jpg','חשבונות חשמל ומים ביטוח טלויזיה_10.jpg',
        'חשבונות חשמל ומים ביטוח טלויזיה_11.jpg','חשבונות חשמל ומים ביטוח טלויזיה_12.jpg',
        'חשבונות חשמל ומים ביטוח טלויזיה_13.jpg','חשבונות חשמל ומים ביטוח טלויזיה_14.jpg',
        'חשבונות חשמל ומים ביטוח טלויזיה_15.jpg','חשבונות חשמל ומים ביטוח טלויזיה_16.jpg',
        'חשבונות חשמל ומים ביטוח טלויזיה_17.jpg','חשבונות חשמל ומים ביטוח טלויזיה_18.jpg',
        'חשבונות חשמל ומים ביטוח טלויזיה_19.jpg','חשבונות חשמל ומים ביטוח טלויזיה_20.jpg',
        'חשבונות חשמל ומים ביטוח טלויזיה_21.jpg',
        'קבלות תשלומים שונים_01.jpg','קבלות תשלומים שונים_02.jpg',
        'קבלות תשלומים שונים_04.jpg','קבלות תשלומים שונים_05.jpg',
        'קבלות תשלומים שונים_09.jpg','קבלות תשלומים שונים_10.jpg',
        'קבלות תשלומים שונים_11.jpg'
      ]
    },
    {
      group: 'תעודות פטירה',
      folder: 'תעודות פטירה',
      items: [
        'תעודות פטירה. אברהם יוסף. סלמה יוסף..jpeg'
      ]
    }
  ];

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function imgCaption(filename) { return filename.replace(/\.(jpg|jpeg|png)$/i, '').replace(/_\d+$/, '').trim(); }
  function imgUrl(folder, filename) {
    return 'assets/photos/' + encodeURIComponent(folder) + '/' + encodeURIComponent(filename);
  }

  var panelVideos = document.getElementById('panel-videos');
  var panelDocs   = document.getElementById('panel-docs');
  var panelPhotos = document.getElementById('panel-photos');
  var tabVideos   = document.getElementById('tab-videos');
  var tabDocs     = document.getElementById('tab-docs');
  var tabPhotos   = document.getElementById('tab-photos');

  function showTab(which) {
    panelVideos.hidden = which !== 'videos';
    panelDocs.hidden   = which !== 'docs';
    panelPhotos.hidden = which !== 'photos';
    tabVideos.setAttribute('aria-selected', String(which === 'videos'));
    tabDocs.setAttribute('aria-selected',   String(which === 'docs'));
    tabPhotos.setAttribute('aria-selected', String(which === 'photos'));
  }
  tabVideos.addEventListener('click', function () { showTab('videos'); });
  tabDocs.addEventListener('click',   function () { showTab('docs'); });
  tabPhotos.addEventListener('click', function () { showTab('photos'); });

  /* ---- videos ---- */
  var vHtml = '';
  VIDEOS.forEach(function (g) {
    vHtml += '<section class="media-group"><h2 class="media-group-title">' + esc(g.group) + '</h2><div class="video-grid">';
    g.items.forEach(function (v) {
      vHtml += '<a class="video-card" href="https://www.youtube.com/watch?v=' + v.id + '" target="_blank" rel="noopener noreferrer">';
      vHtml += '<div class="video-thumb"><img src="https://img.youtube.com/vi/' + v.id + '/hqdefault.jpg" alt="" loading="lazy"><span class="play-btn" aria-hidden="true">▶</span></div>';
      vHtml += '<p class="video-title">' + esc(v.title) + '</p>';
      vHtml += '</a>';
    });
    vHtml += '</div></section>';
  });
  panelVideos.innerHTML = vHtml;

  /* ---- photos ---- */
  var allPhotos = [];  /* flat list {folder, filename, url} for lightbox */
  var groupStarts = [];

  var pHtml = '';
  PHOTOS.forEach(function (g) {
    groupStarts.push(allPhotos.length);
    var openAttr = g.defaultOpen ? ' open' : '';
    var imgCount = g.items.filter(function (it) { return typeof it === 'string'; }).length;
    pHtml += '<details class="photo-section"' + openAttr + '>';
    pHtml += '<summary class="photo-section-title"><span class="photo-section-name">' + esc(g.group) + ' <span class="photo-count">(' + imgCount + ')</span></span></summary>';
    pHtml += '<div class="photo-grid">';
    g.items.forEach(function (item) {
      if (item && typeof item === 'object' && item.doc) {
        var docUrl = imgUrl(g.folder, item.file);
        pHtml += '<a href="' + docUrl + '" download class="doc-card" title="' + esc(item.label) + '">';
        pHtml += '<div class="doc-icon" aria-hidden="true">📄</div>';
        pHtml += '<div class="doc-label">' + esc(item.label) + '</div>';
        pHtml += '</a>';
        return;
      }
      var filename = item;
      var url = imgUrl(g.folder, filename);
      var idx = allPhotos.length;
      allPhotos.push({ folder: g.folder, filename: filename, url: url });
      var caption = esc(imgCaption(filename));
      pHtml += '<button type="button" class="photo-thumb" data-idx="' + idx + '" title="' + caption + '" aria-label="' + caption + '">';
      pHtml += '<img src="' + url + '" alt="' + caption + '" loading="lazy">';
      pHtml += '</button>';
    });
    pHtml += '</div></details>';
  });
  panelDocs.innerHTML = '<div class="photo-search-wrap"><input type="search" id="photo-q" placeholder="חיפוש במסמכים…" autocomplete="off" dir="rtl"><span id="photo-q-count" class="photo-q-count"></span></div>' + pHtml;

  document.getElementById('photo-q').addEventListener('input', function () {
    var q = this.value.replace(/["״׳']/g, '').trim().toLowerCase();
    var total = 0;
    panelDocs.querySelectorAll('.photo-section').forEach(function (sec) {
      var anyVisible = false;
      sec.querySelectorAll('.photo-thumb').forEach(function (btn) {
        var cap = (btn.getAttribute('title') || '').toLowerCase();
        var show = !q || cap.indexOf(q) !== -1;
        btn.hidden = !show;
        if (show) { anyVisible = true; total++; }
      });
      if (q) {
        sec.hidden = !anyVisible;
        if (anyVisible) sec.open = true;
      } else {
        sec.hidden = false;
        sec.querySelectorAll('.photo-thumb').forEach(function (b) { b.hidden = false; });
      }
    });
    var countEl = document.getElementById('photo-q-count');
    countEl.textContent = q ? (total + ' תוצאות') : '';
  });

  /* ---- צילומים (family photos) ---- */
  var PHOTOS_PICS = [
    {
      group: 'צילומים',
      folder: 'צילומים',
      items: [
        '.1995. גבריאל יוסף. אליזבת. ברק יוסף. שושנה זכאי. חנניה זכאי. אורן זכאי. מיכאל יוסף. יפה. בית מלון. בית מלון שרה בטבריה.jpg',
        '1988 .שלום יוסף. כפיר יוסף. נריה יוסף. אביאל יוסף. יהל יוסף.jpg',
        '1989. אלונה זכאי. הדס זכאי. מעוז דוד. עופרי יוסף. חסר מידע.שנות ה 80.jpg',
        '1999. אברהם יוסף. גלעד יוסף.jpg',
        '2007 סלמה שרה יוסף ומשה יוסף בבית אסתר ושמעון וקנין_01.jpg',
        '2007. משה יוסף. הבית אסתר ושמעון וקנין.jpg',
        '29760299_01.jpg',
        '29760314_01.jpg',
        'אברהם יוסף ואחד הילדים_ות_01.jpg',
        'אברהם יוסף פורטרט_01.jpg',
        'אורי זוהר בהופעה_01.jpg',
        'אורן זכאי פורים גיל 2 לערך_01.jpg',
        'גבריאל יוסף חייל_01.jpg',
        'דוד יוסף שושנה יוסף ודינה_01.jpg',
        'ויק עמר ותזמורתו_01.jpg',
        'ויק עמר ותזמורתו_02.jpg',
        'חתולים בכניסה לבית של יעקב יוסף אולי_01.jpg',
        'יום הולדת 5 לסיגל וקנין. סיגל וקנין. אסתר וקנין. שמעון וקנין. ליאור וקנין. שושנה יוסף. משה יוסף.jpg',
        'יעקב יוסף פורטרט_01.jpg',
        'ירון יוסף גיל 2 לערך_01.jpg',
        'ירון יוסף גיל 3 לערך_01.jpg',
        'מאור יוסף גיל 1 לערך_01.jpg',
        'מורדכי יוסף 1 גיל 10 לערך_01.jpg',
        'מורדכי יוסף 10 גיל 10 לערך_01.jpg',
        'מורדכי יוסף 11 שוטר בפורים גיל 6 לערך_01.jpg',
        'מורדכי יוסף 2 גיל 10 לערך_01.jpg',
        'מורדכי יוסף 3 גיל 10 לערך_01.jpg',
        'מורדכי יוסף 4 גיל 8_10 לערך_01.jpg',
        'מורדכי יוסף 5 גיל 5 לערך_01.jpg',
        'מורדכי יוסף 6 גיל 10 לערך_01.jpg',
        'מורדכי יוסף 7 וחברים גיל 8 לערך_01.jpg',
        'מורדכי יוסף 8 גיל 5 לערך_01.jpg',
        'מורדכי יוסף 9 גיל 2 לערך_01.jpg',
        'משה יוסף חייל_01.jpg',
        'משה יוסף מורדכי יוסף וחברים גיל 13 לערך_01.jpg',
        'משה יוסף שנת 2000 לערך_01.jpg',
        'סלמה שרה יוסף באירוע שנת 2000 לערך_01.jpg',
        'סלמה שרה יוסף ונכד שנות ה 80 לערך_01.jpg',
        'סלמה שרה יוסף ורחל יוסף שנת 2000 לערך_01.jpg',
        'סלמה שרה יוסף משה יוסף בבית_01.jpg',
        'סלמה שרה יוסף שנת 2000 לערך_01.jpg',
        'סלמה שרה יוסף_01.jpg',
        'סעדיה וחנה חתונה_02.jpg',
        'סעדיה וחנה יוסף בחתונתם עם אורחים_01.jpg',
        'סעדיה יוסף חייל_01.jpg',
        'סעדיה יוסף פורטרט_01.jpg',
        'רחל דוד גיל 25 לערך_01.jpg',
        'שושנה יוסף 1_01.jpg',
        'שושנה יוסף 2_01.jpg'
      ]
    }
  ];
  var allPics = [];
  var picsHtml = '';
  PHOTOS_PICS.forEach(function (g) {
    var imgCount = g.items.length;
    picsHtml += '<details class="photo-section" open>';
    picsHtml += '<summary class="photo-section-title"><span class="photo-section-name">' + esc(g.group) + ' <span class="photo-count">(' + imgCount + ')</span></span></summary>';
    picsHtml += '<div class="photo-grid">';
    g.items.forEach(function (filename) {
      var url = imgUrl(g.folder, filename);
      var idx = allPics.length;
      allPics.push({ folder: g.folder, filename: filename, url: url });
      var caption = esc(imgCaption(filename));
      picsHtml += '<button type="button" class="photo-thumb" data-idx="' + idx + '" title="' + caption + '" aria-label="' + caption + '">';
      picsHtml += '<img src="' + url + '" alt="' + caption + '" loading="lazy">';
      picsHtml += '</button>';
    });
    picsHtml += '</div></details>';
  });
  panelPhotos.innerHTML = '<div class="photo-search-wrap"><input type="search" id="pics-q" placeholder="חיפוש בצילומים…" autocomplete="off" dir="rtl"><span id="pics-q-count" class="photo-q-count"></span></div>' + picsHtml;

  document.getElementById('pics-q').addEventListener('input', function () {
    var q = this.value.replace(/["״׳']/g, '').trim().toLowerCase();
    var total = 0;
    panelPhotos.querySelectorAll('.photo-section').forEach(function (sec) {
      var anyVisible = false;
      sec.querySelectorAll('.photo-thumb').forEach(function (btn) {
        var cap = (btn.getAttribute('title') || '').toLowerCase();
        var show = !q || cap.indexOf(q) !== -1;
        btn.hidden = !show;
        if (show) { anyVisible = true; total++; }
      });
      if (q) {
        sec.hidden = !anyVisible;
        if (anyVisible) sec.open = true;
      } else {
        sec.hidden = false;
        sec.querySelectorAll('.photo-thumb').forEach(function (b) { b.hidden = false; });
      }
    });
    document.getElementById('pics-q-count').textContent = q ? (total + ' תוצאות') : '';
  });

  /* ---- lightbox ---- */
  var lb = document.createElement('div');
  lb.id = 'lb';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'תצוגת תמונה');
  lb.hidden = true;
  lb.innerHTML =
    '<div class="lb-overlay"></div>' +
    '<div class="lb-stage">' +
      '<button type="button" class="lb-close" aria-label="סגירה">✕</button>' +
      '<button type="button" class="lb-prev" aria-label="הקודם">‹</button>' +
      '<button type="button" class="lb-next" aria-label="הבא">›</button>' +
      '<img class="lb-img" src="" alt="">' +
      '<p class="lb-caption"></p>' +
    '</div>';
  document.body.appendChild(lb);

  var lbImg     = lb.querySelector('.lb-img');
  var lbCaption = lb.querySelector('.lb-caption');
  var lbClose   = lb.querySelector('.lb-close');
  var lbPrev    = lb.querySelector('.lb-prev');
  var lbNext    = lb.querySelector('.lb-next');
  var currentGallery = allPhotos;
  var currentIdx = 0;

  function lbShow(gallery, idx) {
    currentGallery = gallery;
    currentIdx = (idx + gallery.length) % gallery.length;
    var p = gallery[currentIdx];
    lbImg.src = p.url;
    lbImg.alt = imgCaption(p.filename);
    lbCaption.textContent = imgCaption(p.filename);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }
  function lbHide() {
    lb.hidden = true;
    document.body.style.overflow = '';
  }

  panelDocs.addEventListener('click', function (e) {
    var btn = e.target.closest('.photo-thumb');
    if (btn) lbShow(allPhotos, +btn.getAttribute('data-idx'));
  });
  panelPhotos.addEventListener('click', function (e) {
    var btn = e.target.closest('.photo-thumb');
    if (btn) lbShow(allPics, +btn.getAttribute('data-idx'));
  });
  lbClose.addEventListener('click', lbHide);
  lb.querySelector('.lb-overlay').addEventListener('click', lbHide);
  lbPrev.addEventListener('click', function () { lbShow(currentGallery, currentIdx - 1); });
  lbNext.addEventListener('click', function () { lbShow(currentGallery, currentIdx + 1); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape')      lbHide();
    if (e.key === 'ArrowRight')  lbShow(currentGallery, currentIdx + 1);
    if (e.key === 'ArrowLeft')   lbShow(currentGallery, currentIdx - 1);
  });

})();
