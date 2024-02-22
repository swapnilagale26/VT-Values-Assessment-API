const base64Images = require("../models/ImageModels");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const pdfMake = require("pdfmake");
const { font } = require("./SansProFont");

const pdfGenerationController = asyncHandler(async (req, res) => {
  // when we generate pdf on client side we use  convert ttf file into base64 string and pass that string in font
  // when we generate pdf on server side we gives the path of our ttf file
  let {
    widerMiddleDiscription,
    outerMiddleDiscription,
    innerMiddleDiscription,
    username,
    outerLevelArctypeText,
    innerLevelArctypeText,
    widerLevelArctypeText,
    highestWiderArctype,
    highestInnerArctype,
    highestOuterArctype,
    selectWiderCards,
    selectOuterCards,
    selectInnerCards,
  } = req.body;
  let highestWiderArctypeName =
    Object.keys(highestWiderArctype)[0][0].toUpperCase() +
    Object.keys(highestWiderArctype)[0].slice(1);
  let highestOuterArctypeName =
    Object.keys(highestOuterArctype)[0][0].toUpperCase() +
    Object.keys(highestOuterArctype)[0].slice(1);
  let highestInnearArctypeName =
    Object.keys(highestInnerArctype)[0][0].toUpperCase() +
    Object.keys(highestInnerArctype)[0].slice(1);
  // e.log(
  //   consolreq.body,
  //   highestInnearArctypeName,
  //   highestOuterArctypeName,
  //   highestWiderArctypeName
  // );
  if (
    widerMiddleDiscription &&
    outerMiddleDiscription &&
    innerMiddleDiscription &&
    username &&
    outerLevelArctypeText &&
    innerLevelArctypeText &&
    widerLevelArctypeText &&
    highestWiderArctype &&
    highestInnerArctype &&
    highestOuterArctype &&
    selectWiderCards &&
    selectOuterCards &&
    selectInnerCards
  ) {
    const generatePdf = (content, uniqueSuffix) => {
      var fonts = {
        sanPro: {
          normal: "fonts/sanPro/source-sans-pro.regular.ttf", // regular
          bold: "fonts/sanPro/source-sans-pro.bold.ttf", // bold
          italics: "fonts/sanPro/source-sans-pro.black.ttf", // we use italics name for sanpro-black
          bolditalics: "fonts/sanPro/source-sans-pro.semibold.ttf", // bolditalics name for semi bold
        },
      };
      let pdfmake = new pdfMake(fonts);

      const docDefinition = {
        pageMargins: [40, 57, 44, 40],
        compress: true,

        header: function (currentPage) {
          return currentPage != 1 && currentPage != 4
            ? {
                image: "reportImage/header.png",
                width: 600,
                // height: 841.89,
                absolutePosition: { x: 0, y: 0 },
              }
            : {};
        },

        content: [
          //introduction
          {
            image: "reportImage/reportLandingImage.png",
            width: 595.28,
            height: 841.89,
            absolutePosition: { x: 0, y: 0 },
          },

          {
            text: "AstroValues",
            fontSize: 48,
            lineHeight: 1,
            color: "#FFFFFF",
            alignment: "center",
            margin: [0, 261, 0, -5],
            // font:'Roboto',
            italics: true,
          },
          {
            text: "Alignment Report",
            fontSize: 48,
            lineHeight: 1,
            color: "#FFFFFF",
            alignment: "center",
            italics: true, //it is use as san pro black
          },
          {
            text: "Prepared for:",
            fontSize: 27,
            lineHeight: 1.1,
            color: "#FFFFFF",
            alignment: "center",
            bolditalics: true,
          },
          {
            text: `${username}`,
            //text: 'Kalani Salvador',
            fontSize: 30,
            lineHeight: 1.1,
            color: "#FFFFFF",
            alignment: "center",
            bolditalics: true,
          },

          {
            text: "AstroCoaching™ Synergy",
            margin: [110, 237, 30, 3], // [left ,top ,right ,bottom ]
            fontSize: 27,
            lineHeight: 1.1,
            color: "#FFFFFF",
            // alignment: "center",
            bold: true,
          },
          {
            text: "",
            pageBreak: "before",
          },

          //heading

          {
            margin: [-40, 10, 0, 0],
            fillColor: "#433B39",
            layout: "noBorders",
            
            table: {
              widths: [600],
              heights: [27],

              body: [
                [
                 {columns:[
                  {
                  stack:[
                     {
                    image: "reportImage/introductionImage.png",
                    width: 25,
                    height: 27,
                    margin: [20, 0, 0, 0],
                  },

                ],
                width:200
              },
                  {
                    text: "INTRODUCTION",
                    fillColor: "#433B39",
                    // font:'Roboto',
                    fontSize: 18,
                    color: "#FFFFFF",
                    bold: true,
                    width: 200,
                    alignment: "center",
                    margin: [0, 3, 0, 0],
                  },
                  {
                    stack:[
                       {
                      image: "reportImage/introductionImage.png",
                      width: 25,
                      height: 27,
                      margin: [152,0, 0, 0],
                    },
  
                  ],
                  width:200
                },
                 
                ],
              },
              ],
            ],
            },
          },

          {
            image: "reportImage/line.png",
            width: 1.5,
            height: 115,
            absolutePosition: { x: 93, y: 335 },
          },
          {
            image: "reportImage/Report_Introduction_paragrapgh.png",
            width: 140,
            height: 140,
            absolutePosition: { x: 23, y: 195 },
          },

          

          {
            style: "tableExample",
            fillColor: "#F5D9D5",
            layout: "noBorders",
            // {
            //     hLineColor: function (i) {
            //       return "#F5D9D5";
            //     },
            //     vLineColor: function (i) {
            //       return "#F5D9D5";
            //     }
            // },
            table: {
              widths: [600],
              body: [
                [
                  {
                    columns: [
                      {
                        stack: [
                          {
                            text: "Understanding Archetypes: Embracing the Light and Shadow Within",
                            fontSize: 15,
                            margin: [0, 5, 0, 10],
                            // font:'Roboto',
                            // it is way by which we can add multiple font   for default  font use  we dont need  to define font:'sanpro'  it automatically considers
                            //   which font type need to be apply is  decided  by if bold is equal to true then  bold font is applied
                            bold: true,
                            color: "#433B39",
                            alignment: "center",
                          },

                          {
                            text: "Welcome to a nuanced exploration of your inner archetypes, an endeavour akin to deciphering the interplay of light and darkness in shaping our perception. This journey invites you to delve into the light and shadow aspects of each archetype. Like a switch, their potential for activation remains constant: the light side illuminates through conscious engagement, while the shadow emerges in its absence, akin to a room plunged into darkness when the light is turned off.",
                            margin: [180, 0, 50, 10],
                            fontSize: 12,
                            lineHeight: 1.2,
                            color: "#433B39",
                          },
                          {
                            text: "Consider the science of epigenetics, where genes may be expressed differently based on the environment. Similarly, the expression of these archetypal aspects is profoundly influenced by the environment of our consciousness. The levels of consciousness — Universal, Transcendent, and Soul-Level — act as distinct environments that shape how these constant archetypal traits manifest and interact in our lives. Just as the external environment can influence gene expression in epigenetics, our level of consciousness can alter how the light and shadow aspects of our archetypes are experienced and expressed.",
                            margin: [180, 0, 50, 8],
                            fontSize: 12,
                            lineHeight: 1.2,
                            color: "#433B39",
                          },
                        ],
                      },
                    ],
                  },
                ],
              ],
            },
          },

          // line for to daw on  left side
          {
            image: "reportImage/line.png",
            width: 0.5,
            height: 100,
            absolutePosition: { x: 30, y: 450 },
          },
          {
            image: "reportImage/line.png",
            width: 0.5,
            height: 130,
            absolutePosition: { x: 30, y: 567 },
          },

          {
            image: "reportImage/line.png",
            width: 0.5,
            height: 74,
            absolutePosition: { x: 30, y: 712 },
          },

          {
            style: "tableExample",
            margin: [-40, 0, 0, 0],
            table: {
              widths: [600],
              heights: [24],
              layout: "fullwidth",

              body: [
                [
                  {
                    text: "The Interplay of Light and Shadow in Archetypes:",
                    fillColor: "#B28D94",
                    fontSize: 15,
                    color: "#FFFFFF",
                    bold: true,
                    width: 300,
                    border: [false, false, false, false],
                    margin: [55, 3, 0, 0],
                  },
                ],
              ],
            },
          },

          {
            text: "Your AstroValues Alignment Assessment reveals archetypes embodying a profound duality - the Light and Shadow aspects. These two sides of the same coin are integral to understanding the full spectrum of each archetype.",
            margin: [30, 10, 5, 5],
            fontSize: 12,
            lineHeight: 1.3,
            color: "#433B39",
          },

          {
            margin: [-40, 0, 0, 0],
            layout: "noBorders",
            table: {
              widths: [40, 450],
              body: [
                [
                  {
                    image: "reportImage/sideDecorationImage.png",
                    width: 17,
                    height: 17,
                    margin: [22, 0, 0, 0],
                    border: [false, false, false, false],
                  },
                  {
                    text: "Expressing the Light Side: Conscious Engagement",
                    fontSize: 12,
                    margin: [22, 0, 0, 5],
                    bold: true,
                    lineHeight: 1,
                    color: "#B28D94",
                  },
                ],
              ],
            },
          },

          {
            text: "When we actively engage with the positive qualities of an archetype, we are expressing its Light side. This involves a conscious decision to harness the strengths and potentials inherent in the archetype. For example, the Light side of the Sun archetype involves using charisma and leadership for inspiring and uplifting others. Engaging with this Light side means recognizing and utilizing these qualities in a way that aligns with your highest self and positively impacts those around you.",
            fontSize: 12,
            lineHeight: 1.3,
            color: "#433B39",
            margin: [30, 0, 0, 5],
          },

          {
            margin: [-40, 0, 0, 0],
            layout: "noBorders",
            table: {
              widths: [40, 450],
              body: [
                [
                  {
                    image: "reportImage/sideDecorationImage.png",
                    width: 17,
                    height: 17,
                    margin: [22, 0, 0, 0],
                    border: [false, false, false, false],
                  },
                  {
                    text: "Manifesting the Shadow Side: Denial and Repression",
                    fontSize: 12,
                    margin: [22, 0, 0, 5],
                    bold: true,
                    lineHeight: 1,
                    color: "#B28D94",
                  },
                ],
              ],
            },
          },

          //    page 2    //
          {
            text: "Conversely, when we deny, ignore, or repress the negative aspects of an archetype, we inadvertently give rise to its Shadow side. This is often an unconscious process where the less desirable characteristics of the archetype manifest in our behaviours and attitudes. For instance, if the natural leadership qualities of the Sun archetype are repressed or denied, it may manifest as the Shadow of vanity or egotism. Instead of inspiring others, the repressed qualities might lead to dominating or overshadowing those around us.",
            fontSize: 12,
            lineHeight: 1.2,
            color: "#433B39",
            margin: [30, 0, 0, 5],
          },
          {
            margin: [-40, 0, 0, 0],
            layout: "noBorders",
            table: {
              widths: [40, 450],
              body: [
                [
                  {
                    image: "reportImage/sideDecorationImage.png",
                    width: 17,
                    height: 17,
                    margin: [22, 0, 0, 0],
                    border: [false, false, false, false],
                  },
                  {
                    text: "Balancing the Archetypal Coin: Awareness and Integration",
                    fontSize: 12,
                    margin: [22, 0, 0, 0],
                    bold: true,
                    lineHeight: 1,
                    color: "#B28D94",
                  },
                ],
              ],
            },
          },

          {
            text: "The key to navigating this duality lies in awareness and integration. By acknowledging both the Light and Shadow aspects of our archetypes, we can make more conscious choices about how we express these energies.It's not about completely eradicating the Shadow side; rather, it's about recognizing it as a signal for areas in our life that require attention, understanding, and possibly transformation.",
            fontSize: 12,
            lineHeight: 1.3,
            color: "#433B39",
            margin: [30, 0, 0, 5],
          },
          // left side line code
          {
            image: "reportImage/line.png",
            width: 0.5,
            height: 37,
            absolutePosition: { x: 30, y: 63 },
          },
          {
            image: "reportImage/line.png",
            width: 0.5,
            height: 106,
            absolutePosition: { x: 30, y: 117 },
          },

          // right side line code
          {
            image: "reportImage/line.png",
            width: 0.5,
            height: 259,
            absolutePosition: { x: 570, y: 260 },
          },

          // // Harmoniz across different level
          {
            margin: [-40, 0, 0, 11],
            table: {
              widths: [33, 33, 33, 333, 33, 33, 33],
              heights: [31],
              fillColor: "#F5D9D5",
              layout: {
                vLineColor: function (i) {
                  return "#F5D9D5";
                },
                // hLineColor: function (i) {
                //   return "#F5D9D5";
                // },
                // hLineWidth: function (i, node) {
                //  return -1;;
                // },
                // vLineWidth: function (i, node) {
                //   return -1;
                // },
              },

              body: [
                [
                  {
                    image: "reportImage/harmonizheaderfirst.png",
                    width: 24,
                    height: 24,
                    margin: [10, 4, 0, 0],
                    fillColor: "#F5D9D5",
                    border: [false, false, false, false],
                  },
                  {
                    image: "reportImage/harmonizheadersecond.png",
                    width: 24,
                    height: 24,
                    margin: [4, 2, 0, 0],
                    fillColor: "#F5D9D5",
                    border: [false, false, false, false],
                  },
                  {
                    image: "reportImage/harmonizheaderthird.png",
                    width: 24,
                    height: 24,
                    margin: [5, 3, 0, 0],
                    fillColor: "#F5D9D5",
                    border: [false, false, false, false],
                  },
                  {
                    text: "Harmonizing Across Levels of Consciousness:",
                    fillColor: "#F5D9D5",
                    fontSize: 16,
                    color: "#433B39",
                    bold: true,
                    alignment: "center",
                    margin: [0, 5, 0, 0],
                    fillColor: "#F5D9D5",
                    border: [false, false, false, false],
                  },
                  {
                    image: "reportImage/harmonizheaderthird.png",
                    width: 24,
                    height: 24,
                    margin: [5, 3, 0, 0],
                    fillColor: "#F5D9D5",
                    border: [false, false, false, false],
                  },
                  {
                    image: "reportImage/harmonizheadersecond.png",
                    width: 24,
                    height: 24,
                    margin: [5, 2, 0, 0],
                    fillColor: "#F5D9D5",
                    border: [false, false, false, false],
                  },
                  {
                    image: "reportImage/harmonizheaderfirst.png",
                    width: 24,
                    height: 24,
                    margin: [3, 4, 6, 0],
                    fillColor: "#F5D9D5",
                    border: [false, false, false, false],
                  },
                ],
              ],
            },
          },
          {
            text: "In the different levels of consciousness – Universal, Transcendent, and Soul-Level – the Light and Shadow aspects play unique roles. At each level, our task is to harmonize these aspects ensuring that we engage with our archetypes in a way that elevates our vibrational frequency and aligns with our true essence.",
            fontSize: 12,
            lineHeight: 1.3,
            color: "#433B39",
            margin: [15, 0, 15, 0],
          },

          {
            style: "tableExample",
            layout: "noBorders",
            table: {
              widths: [130, 410, 40],
              body: [
                // universal
                [
                  {
                    image: "reportImage/harmonizparafirst.png",
                    width: 25,
                    height: 25,
                    margin: [80, 5, 0, 0],
                    border: [false, false, false, false],
                  },
                  {
                    text: "In Universal Consciousness, we connect our archetypes to broader humanity and universal truths, balancing personal aspirations with collective needs.",
                    fontSize: 12,
                    lineHeight: 1.3,
                    color: "#433B39",
                    margin: [0, 0, 0, 0],
                  },
                  {},
                ],
                // Transcendent
                [
                  {
                    image: "reportImage/harmonizparasecond.png",
                    width: 25,
                    height: 25,
                    margin: [80, 12, 0, 0],
                    border: [false, false, false, false],
                  },
                  {
                    text: "In Transcendent Consciousness, we explore how our individual interpretation of these archetypes influences our intellectual and emotional landscape, balancing personal insights with universal wisdom.",
                    fontSize: 12,
                    lineHeight: 1.2,
                    color: "#433B39",
                    margin: [0, 0, 0, 0],
                  },
                  {},
                ],
                // soul-level
                [
                  {
                    image: "reportImage/harmonizparathird.png",
                    width: 25,
                    height: 25,
                    margin: [80, 12, 0, 0],
                    border: [false, false, false, false],
                  },
                  {
                    text: "In Soul-Level Consciousness, we delve into our deepest self, where our archetypes resonate with our soul's essence, seeking a harmonious expression of our most authentic self.",
                    fontSize: 12,
                    lineHeight: 1.3,
                    color: "#433B39",
                    margin: [0, 0, 0, 0],
                  },
                  {},
                ],
              ],
            },
          },

          // // conculsion  of second page

          {
            margin: [-40, 6, 0, 0],
            fillColor: "#433B39",
            layout: "noBorders",
            table: {
              widths: [600],
              heights: [27],

              body: [
                [
                  {
                    columns: [
                      {
                        stack: [
                          {
                            image: "reportImage/introductionImage.png",
                            width: 25,
                            height: 27,
                            margin: [17, 0, 0, 0],
                            border: [false, false, false, false],
                          },
                        ],
                        width: 200,
                      },

                      {
                        text: "CONCLUSION",
                        fillColor: "#433B39",
                        fontSize: 18,
                        color: "#FFFFFF",
                        bold: true,
                        width: 200,
                        alignment: "center",
                        margin: [0, 3, 0, 0],
                        border: [false, false, false, false],
                      },
                      {
                        stack: [
                          {
                            image: "reportImage/introductionImage.png",
                            width: 25,
                            height: 27,
                            margin: [157, 0, 0, 0],
                            border: [false, false, false, false],
                          },
                        ],
                        width: 200,
                      },
                    ],
                  },
                ],
              ],
            },
          },

          {
            style: "tableExample",
            fillColor: "#F5D9D5",
            table: {
              widths: [320, 270],
              body: [
                [
                  {
                    text: "Understanding the light and shadow aspects of your archetypes across these levels of consciousness offers a roadmap for personal growth and fulfilment. It encourages a journey of self-discovery, where both the light and shadow are essential guides, helping you navigate the complex terrain of your inner world. This process leads towards a more integrated, authentic self, offering insights and transformations that are as unique as your individual journey.",
                    margin: [50, 12, 30, 3],
                    fontSize: 12,
                    lineHeight: 1.3,
                    color: "#433B39",
                    border: [false, false, false, false],
                  },
                  {
                    image: "reportImage/harmonizparaimage.png",
                    width: 200,
                    height: 200,
                    margin: [20, 10, 50, 0],
                    fillColor: "#F5D9D5",
                    border: [false, false, false, false],
                  },
                ],
              ],
            },
          },

          {
            text: "",
            pageBreak: "before",
          },
          // in pdf make their  is no concept z-index  to stack element we need to stack according to order so here we see their is
          // background image with text on it

          {
            image: "reportImage/Detailed_Report_Background_Image.jpg",
            width: 595.28,
            height: 841.89,
            absolutePosition: { x: 0, y: 0 },
          },
          {
            text: "Detailed Report",
            fontSize: 58,
            lineHeight: 1,
            color: "#FFFFFF",
            //alignment: "center",
            margin: [62, 327, 0, 0],
            italics: true,
          },
          {
            text: "Copyright © Ventura eLearning Global",
            fontSize: 15,
            //lineHeight: 1,
            color: "#FFFFFF",
            //alignment: "center",
            //margin: [0, 330, 0, 0],
            absolutePosition: { x: 190, y: 780 },
          },

          {
            text: "",
            pageBreak: "before",
          },

          // //   Congratulations on Your Completion of the AstroValues   report section
          {
            image: "reportImage/reportcongrate.png",
            absolutePosition: { x: 0, y: 67 },
            width: 600,
            height: 405,
          },

          {
            fillColor: "#F5D9D5",
            margin: [-40, 10, 0, 0],
            layout: "noBorders",
            table: {
              widths: [600],
              body: [
                [
                  {
                    // 3rd page
                    columns: [
                      {
                        stack: [
                          {
                            text: "Congratulations on Your Completion of the AstroValues Alignment Assessment",
                            style: "header",
                            margin: [100, 25, 100, 8],
                            alignment: "center",
                          },

                          {
                            text: "Welcome to a journey of self-discovery that transcends the ordinary. Imagine embarking on a voyage across the vast ocean of your inner self, where each wave uncovers deeper layers of your identity and purpose. This assessment is not merely an exploration of values and archetypes; it's akin to navigating the rich and uncharted waters of your soul.",
                            fontSize: 12,
                            lineHeight: 1.3,
                            color: "#433B39",
                            margin: [100, 9, 90, 8],
                          },

                          {
                            text: "As you delve into the pages of this report, picture each insight as a beacon of light illuminating the path to your true self. Remember, these revelations are more than reflections; they are keys unlocking the doors to unexplored chambers of your heart and mind. This journey is an invitation to meet, understand, and embrace the most authentic version of yourself.",
                            fontSize: 12,
                            lineHeight: 1.3,
                            color: "#433B39",
                            margin: [100, 0, 90, 8],
                          },

                          {
                            text: "We encourage you to approach this report not just as a reader but as an explorer. Let the insights you discover guide you toward a life that resonates with your deepest aspirations and truths. The journey ahead is yours to shape, a canvas  awaiting your unique imprint.",
                            fontSize: 12,
                            lineHeight: 1.4,
                            color: "#433B39",
                            margin: [100, 0, 90, 8],
                          },
                        ],
                      },
                    ],
                  },
                ],
              ],
            },
          },

          // // // wider level Archetype
          // // //  Header
          {
            style: "tableExample",
            fillColor: "#B28D94",
            layout: "noBorders",

            margin: [-40, 0, 0, 0],
            table: {
              widths: [600],
              heights: [24],

              body: [
                [
                  {
                    columns: [
                      {
                        stack: [
                          {
                            image: "reportImage/universalbanerleftright.png",
                            width: 27,
                            height: 27,
                            margin: [15, 4, 0, 0],
                            border: [false, false, false, false],
                          },
                      
                        ],
                        width:45
                      },
                      {
                        text: "Universal Consciousness Values:",
                        fontSize: 16,
                        color: "#FFFFFF",
                        lineHeight: 1.4,
                        bold: true,
                        width: 300,
                        border: [false, false, false, false],
                        margin: [15, 6, 0, 0],
                      },
                      {
                        stack: [
                          {
                            image: "reportImage/universalbanerleftright.png",
                            width: 27,
                            height: 27,
                            margin: [209, 4, 0, 0],
                            border: [false, false, false, false],
                          },
                        ],
                      },
                    ],
                  },
                ],
              ],
            },
          },

          // // // //heading description  paragraph  with half icon on left and right side
          {
            style: "tableExample",

            margin: [-40, 0, 0, 0],
            table: {
              widths: [30, 495, 40],
              heights: [24],

              body: [
                [
                  {
                    image: "reportImage/universalbaner.png",
                    width: 80,
                    height: 90,
                    margin: [-44.5, 14, 0, 0],
                    border: [false, false, false, false],
                  },
                  {
                    text: widerLevelArctypeText.mainParagraph,
                    fontSize: 12,
                    color: "#433B39",
                    lineHeight: 1.2,
                    border: [false, false, false, false],
                    margin: [15, 6, 2, 0],
                  },
                  {
                    image: "reportImage/universalbaner.png",
                    width: 80,
                    height: 90,
                    margin: [6.5, 14, 0, 0],
                    border: [false, false, false, false],
                  },
                ],
              ],
            },
          },

          {
            text: "The " + `${highestWiderArctypeName}` + " Archetype:",
            fontSize: 15,
            bold: true,
            lineHeight: 1.3,
            color: "#B28D94",
            align: "center",
            margin: [16, 8, 0, 5],
          },
          // //archetype description
          {
            text: [
              {
                text: `${widerLevelArctypeText.archetypeTextFirst} the ${highestWiderArctypeName} archetype. ${widerLevelArctypeText.archetypeTextSecond}`,
                style: "anotherStyle",
              },
            ],
            style: "anotherStyle",
            margin: [16, 0, 0, 0],
          },
          // card discription
          {
            text: [
              {
                text: `${widerMiddleDiscription[0].heading} `,
                style: "Archetype",
                color: "#433B39",
              },
              {
                text: `${widerMiddleDiscription[0].discription}`,
                style: "anotherStyle",
              },
            ],
            style: "anotherStyle",
            margin: [16, 11, 0, 0],
          },

          {
            text: [
              {
                text: `${widerMiddleDiscription[1].heading} `,
                style: "Archetype",
                color: "#433B39",
              },
              {
                text: `${widerMiddleDiscription[1].discription}`,
                style: "anotherStyle",
              },
            ],
            style: "anotherStyle",
            margin: [16, 11, 0, 0],
          },

          {
            text: `${widerMiddleDiscription[2].heading} `,
            style: "Archetype",
            style: "anotherStyle",
            fontSize: 15,
            bold: true,
            lineHeight: 1.4,
            color: "#B28D94",
            align: "center",
            margin: [16, 4, 0, 0],
          },

          {
            text: `${widerMiddleDiscription[2].discription}`,
            style: "anotherStyle",
            margin: [16, 3, 0, 0],
          },

          {
            text: `Selected Universal Consciousness Values:`,
            fontSize: 15,
            bold: true,
            lineHeight: 1.4,
            color: "#B28D94",
            align: "center",
            margin: [16, 7, 0, 0],
          },

          {
            ul: selectWiderCards.map((ele) => {
              let cardDetail = ele.reportDescription.replace(
                /([a-zA-Z]+)\s+/,
                ""
              );

              return {
                text: [
                  { text: `${ele.name} `, style: "headerlist" },
                  {
                    text: `${cardDetail}`,
                    style: "anotherStyle",
                    fontSize: 12,
                    lineHeight: 1.4,
                    color: "#433B39",
                  },
                ],
                margin: [25, 7, 0, 0],
              };
            }),
          },
          {
            text: "",
            pageBreak: "before",
          },

          // // //outer Level Arctype

          // //header
          {
            style: "tableExample",
            fillColor: "#D6B6BB",
            margin: [-40, 0, 0, 0],
            layout: "noBorders",
            table: {
              widths: [600],
              heights: [24],
              body: [
                [
                  {
                    columns: [
                      {
                        stack: [
                          {
                            image: "reportImage/transcendentbaner.png",
                            width: 26,
                            height: 26,
                            margin: [15, 3, 0, 0],
                            border: [false, false, false, false],
                          },
                        ],
                        width: 45,
                      },
                      {
                        text: "Transcendent Consciousness Values: ",
                        fontSize: 16,
                        color: "#433B39",
                        lineHeight: 1.4,
                        bold: true,
                        width: 300,
                        border: [false, false, false, false],
                        margin: [15, 6, 0, 0],
                      },
                      {
                        image: "reportImage/transcendentbaner.png",
                        width: 26,
                        height: 26,
                        margin: [209, 3, 0, 0],
                        border: [false, false, false, false],
                      },
                    ],
                  },
                ],
              ],
            },
          },

          // // heading description  with left and right side half icon
          {
            style: "tableExample",

            margin: [-40, 0, 0, 0],
            table: {
              widths: [30, 495, 40],
              heights: [24],

              body: [
                [
                                            {
                            image: "reportImage/transcendentparagraph.png",
                            width: 80,
                            height: 90,
                            margin: [-44.5, 14, 0, 0],
                            border: [false, false, false, false],
                                                },
                      {
                        text: outerLevelArctypeText.mainParagraph,
                        fontSize: 12,
                        color: "#433B39",
                        lineHeight: 1.2,
                        border: [false, false, false, false],
                        margin: [15, 6, 2, 0],
                      },
                      {
                        image: "reportImage/transcendentparagraph.png",
                        width: 80,
                        height: 90,
                        margin: [6.5, 14, 0, 0],
                        border: [false, false, false, false],
                                        },
                ],
              ],
            },
          },

          // it heading showing " The Sun Archetyoe"
          {
            text: `The ${highestOuterArctypeName} Archetype :`,
            fontSize: 15,
            bold: true,
            lineHeight: 1.3,
            color: "#B28D94",
            align: "center",
            margin: [16, 8, 0, 5],
          },
          //*
          //archetype description
          {
            text: [
              {
                text: `${outerLevelArctypeText.archetypeTextFirst} the ${highestOuterArctypeName} archetype, ${outerLevelArctypeText.archetypeTextSecond}`,
                style: "anotherStyle",
              },
            ],
            style: "anotherStyle",
            margin: [16, 0, 0, 0],
          },
          // card discription 1st parragraph
          {
            text: [
              {
                text: `${outerMiddleDiscription[0].heading} `,
                style: "Archetype",
              },
              {
                text: `${outerMiddleDiscription[0].discription}`,
                style: "anotherStyle",
              },
            ],
            style: "anotherStyle",
            margin: [16, 11, 0, 0],
          },

          // card discription 2nd parragraph
          {
            text: [
              {
                text: `${outerMiddleDiscription[1].heading} `,
                style: "Archetype",
              },
              {
                text: `${outerMiddleDiscription[1].discription}`,
                style: "anotherStyle",
              },
            ],
            style: "anotherStyle",
            margin: [16, 11, 0, 0],
          },

          // card discription 3rd parragraph
          {
            text: `${outerMiddleDiscription[2].heading} `,
            style: "Archetype",
            style: "anotherStyle",
            fontSize: 15,
            bold: true,
            lineHeight: 1.4,
            color: "#B28D94",
            align: "center",
            margin: [16, 4, 0, 0],
          },

          {
            text: `${outerMiddleDiscription[2].discription}`,
            style: "anotherStyle",
            margin: [16, 3, 0, 0],
          },

          {
            text: "",
            pageBreak: "before",
          },

          //  selected card heading

          {
            text: `Selected Transcendent Consciousness Values:`,
            fontSize: 15,
            bold: true,
            lineHeight: 1.4,
            color: "#B28D94",
            align: "center",
            margin: [16, 7, 0, 0],
          },

          // list of selected card
          {
            ul: selectOuterCards.map((ele) => {
              let cardDetail = ele.reportDescription.replace(
                /([a-zA-Z]+)\s+/,
                ""
              );
              return {
                text: [
                  { text: `${ele.name} `, style: "headerlist" },
                  {
                    text: `${cardDetail}`,
                    style: "anotherStyle",
                    fontSize: 12,
                    lineHeight: 1.4,
                    color: "#433B39",
                  },
                ],
                margin: [25, 7, 0, 0],
              };
            }),
          },
          {
            text: "",
            pageBreak: "before",
          },

          //outer Level Arctype

          // // //header
          {
            style: "tableExample",
            fillColor: "#F5D9D5",
            layout: "noBorders",
            margin: [-40, 0, 0, 0],
            table: {
              widths: [600],
              heights: [24],

              body: [
                [
                  {
                    columns: [
                      {
                        stack: [
                          {
                            image: "reportImage/soulbaner.png",
                            width: 26,
                            height: 26,
                            margin: [15, 3, 0, 0],
                            border: [false, false, false, false],
                          },
                        ],
                        width: 45,
                      },
                      {
                        text: "Soul-Level Consciousness Values: ",
                        fontSize: 16,
                        color: "#433B39",
                        lineHeight: 1.4,
                        bold: true,
                        width: 300,
                        border: [false, false, false, false],
                        margin: [15, 6, 0, 0],
                      },
                      {
                        stack: [
                          {
                            image: "reportImage/soulbaner.png",
                            width: 26,
                            height: 26,
                            margin: [209, 3, 0, 0],
                            border: [false, false, false, false],
                          },
                        ],
                      },
                    ],
                  },
                ],
              ],
            },
          },

          // // heading description  with left and right side half icon
          {
            style: "tableExample",

            margin: [-40, 0, 0, 0],
            table: {
              widths: [30, 495, 40],
              heights: [24],

              body: [
                [
                  {
                    image: "reportImage/soulparagraph.png",
                    width: 80,
                    height: 90,
                    margin: [-44.5, 14, 0, 0],
                    border: [false, false, false, false],
                  },
                  {
                    text: innerLevelArctypeText.mainParagraph,
                    fontSize: 12,
                    color: "#433B39",
                    lineHeight: 1.2,
                    border: [false, false, false, false],
                    margin: [15, 6, 2, 0],
                  },
                  {
                    image: "reportImage/soulparagraph.png",
                    width: 80,
                    height: 90,
                    margin: [6.5, 14, 0, 0],
                    border: [false, false, false, false],
                  },
                ],
              ],
            },
          },

          // it heading showing " The Sun Archetyoe"
          {
            text: `The ${highestInnearArctypeName} Archetype :`,
            fontSize: 15,
            bold: true,
            lineHeight: 1.3,
            color: "#B28D94",
            align: "center",
            margin: [16, 8, 0, 5],
          },
          //*
          //archetype description
          {
            text: [
              {
                text: `${innerLevelArctypeText.archetypeTextFirst} the ${highestInnearArctypeName} archetype, ${innerLevelArctypeText.archetypeTextSecond}`,
                style: "anotherStyle",
              },
            ],
            style: "anotherStyle",
            margin: [16, 0, 0, 0],
          },
          // card discription 1st parragraph
          {
            text: [
              {
                text: `${innerMiddleDiscription[0].heading} `,
                style: "Archetype",
              },
              {
                text: `${innerMiddleDiscription[0].discription}`,
                style: "anotherStyle",
              },
            ],
            style: "anotherStyle",
            margin: [16, 11, 0, 0],
          },

          // card discription 2nd parragraph
          {
            text: [
              {
                text: `${innerMiddleDiscription[1].heading} `,
                style: "Archetype",
              },
              {
                text: `${innerMiddleDiscription[1].discription}`,
                style: "anotherStyle",
              },
            ],
            style: "anotherStyle",
            margin: [16, 11, 0, 0],
          },

          // card discription 3rd parragraph
          {
            text: `${innerMiddleDiscription[2].heading} `,
            style: "Archetype",
            style: "anotherStyle",
            fontSize: 15,
            bold: true,
            lineHeight: 1.4,
            color: "#B28D94",
            align: "center",
            margin: [16, 4, 0, 0],
          },

          {
            text: `${innerMiddleDiscription[2].discription}`,
            style: "anotherStyle",
            margin: [16, 3, 0, 0],
          },

          {
            text: "",
            pageBreak: "before",
          },
          //  selected card heading

          {
            text: `Selected Soul-Level Consciousness Values:`,
            fontSize: 15,
            bold: true,
            lineHeight: 1.4,
            color: "#B28D94",
            align: "center",
            margin: [16, 7, 0, 0],
          },

          // list of selected card
          {
            ul: selectInnerCards.map((ele) => {
              let cardDetail = ele.reportDescription.replace(
                /([a-zA-Z]+)\s+/,
                ""
              );
              return {
                text: [
                  { text: `${ele.name} `, style: "headerlist" },
                  {
                    text: `${cardDetail}`,
                    style: "anotherStyle",
                    fontSize: 12,
                    lineHeight: 1.4,
                    color: "#433B39",
                  },
                ],
                margin: [25, 7, 0, 0],
              };
            }),
          },
          {
            text: "",
            pageBreak: "before",
          },

          // // LAST PAGE OF REPORT WHICH IS CONCULSION
          {
            margin: [-40, 6, 0, 0],
            fillColor: "#433B39",
            layout: "noBorders",

            table: {
              widths: [600],
              heights: [30],

              body: [
                [
                  {
                    columns: [
                      {
                        stack: [
                          {
                            image: "reportImage/conculsionpageheader.png",
                            width: 25,
                            height: 25,
                            margin: [20, 3, 0, 0],
                            border: [false, false, false, false],
                          },
                        ],
                        width: 200,
                      },

                      {
                        text: "CONCLUSION",
                        fillColor: "#433B39",
                        fontSize: 18,
                        color: "#FFFFFF",
                        bold: true,
                        width: 200,
                        alignment: "center",
                        margin: [0, 4, 0, 0],
                        border: [false, false, false, false],
                      },
                      {
                        stack: [
                          {
                            image: "reportImage/conculsionpageheader.png",
                            width: 25,
                            height: 25,
                            margin: [150, 3, 0, 0],
                            border: [false, false, false, false],
                          },
                        ],
                        width: 200,
                      },
                    ],
                  },
                ],
              ],
            },
          },

          {
            text: "Reflecting on Your AstroValues Alignment Assessment",
            fontSize: 15,
            margin: [0, 13, 0, 7],
            // font:'Roboto',
            // it is way by which we can add multiple font   for default  font use  we dont need  to define font:'sanpro'  it automatically considers
            //   which font type need to be apply is  decided  by if bold is equal to true then  bold font is applied
            bold: true,
            color: "#B28D94",
            alignment: "center",
          },
          //   {
          //   image: "reportImage/line.png",
          //   width: 1.5,
          //   height:500,
          //   absolutePosition: { x: 150, y: 68 },
          // },
          {
            style: "tableExample",
            margin: [-25, 0, 0, 0],
            layout: "noBorders",
            table: {
              widths: [140, 370],
              body: [
                // universal
                [
                  {
                    image: "reportImage/conculsionfirst.png",
                    width: 68,
                    height: 68,
                    margin: [33, 7, 0, 0],
                    border: [false, false, false, false, false],
                  },
                  {
                    text: "As you stand at the threshold of this journey's end, pause, and look back at the path you've traversed. The archetypes and values you've encountered are like stars in your personal constellation, each shining light on different facets of your being. They offer a map to navigate the complexities of your personality and aspirations.",
                    fontSize: 12,
                    lineHeight: 1.1,
                    color: "#433B39",
                    margin: [7, 0, 0, 5],
                    border: [false, false, false, false, false],
                  },
                ],
                // Transcendent
                [
                  {
                    image: "reportImage/conculsionsecond.png",
                    width: 68,
                    height: 68,
                    margin: [33, 2, 0, 0],
                    border: [false, false, false, false, false],
                  },
                  {
                    text: "Consider these insights as companions on your ongoing journey of growth and self-discovery. They are not mere labels but living parts of your story, evolving as you do. They serve as guides, encouraging you to align your daily actions and decisions with the essence of who you truly are.",
                    fontSize: 12,
                    lineHeight: 1.1,
                    color: "#433B39",
                    margin: [7, 0, 0, 4],
                    border: [false, false, false, false, false],
                  },
                ],
                // soul-level
                [
                  {
                    image: "reportImage/conculsionthird.png",
                    width: 68,
                    height: 68,
                    margin: [33, -2, 0, 0],
                    border: [false, false, false, false, false],
                  },
                  {
                    text: "Reflect on how these revelations can inspire and shape your path forward. Envision a future where you are fully aligned with your core values, living a life that is not just successful by external measures but profoundly fulfilling.",
                    fontSize: 12,
                    lineHeight: 1.1,
                    color: "#433B39",
                    margin: [7, 1, 0, 7],
                    border: [false, false, false, false, false],
                  },
                ],
              ],
            },
          },
          {
            image: "reportImage/conculsionparagraph.png",
            width: 390,
            height: 257,
            absolutePosition: { x: 265, y: 450 },
          },
          {
            fillColor: "#F5D9D5",
            margin: [-40, 1, 0, 0],
            layout: "noBorders",

            table: {
              widths: [600],
              //borderColor: [255, 255, 255],
              body: [
                [
                  // 3rd page
                  {
                    stack: [
                      {
                        text: "Journaling Reflections:",
                        fontSize: 16,
                        lineHeight: 1.2,
                        color: "#433B39",
                        decoration: "underline",
                        bold: true,
                        margin: [70, 12, 0, 7],
                      },
                      {
                        text: [
                          { text: `Personal Alignment:`, bold: true },
                          {
                            text: ` How do the identified values and archetypes resonate with your current life choices? Where do you see opportunities for alignment?`,
                            style: "anotherStyle",
                          },
                        ],
                        style: "anotherStyle",
                        margin: [70, 0, 90, 3],
                        fontSize: 12,
                        lineHeight: 1.2,
                      },

                      {
                        text: [
                          {
                            text: `Growth and Challenges:`,
                            style: "Archetype",
                          },
                          {
                            text: ` What strengths do your archetypes and values highlight? What challenges might they present, and how can you address these?`,
                            style: "anotherStyle",
                          },
                        ],
                        style: "anotherStyle",
                        margin: [70, 0, 90, 3],
                        fontSize: 12,
                        lineHeight: 1.2,
                      },

                      {
                        text: [
                          { text: `Future Vision:`, style: "Archetype" },
                          {
                            text: ` How can you integrate these insights into your personal and professional life to create a future that aligns with your true self?`,
                            style: "anotherStyle",
                          },
                        ],
                        style: "anotherStyle",
                        margin: [70, 0, 90, 3],
                        fontSize: 12,
                        lineHeight: 1.2,
                      },

                      {
                        text: [
                          {
                            text: `Transformative Actions:`,
                            style: "Archetype",
                          },
                          {
                            text: ` What small steps can you take today to start living in harmony with your identified values and archetypes? `,
                            style: "anotherStyle",
                          },
                        ],
                        style: "anotherStyle",
                        margin: [70, 0, 90, 3],
                        fontSize: 12,
                        lineHeight: 1.2,
                      },

                      {
                        text: "As you embark on this continuing journey of self-exploration and personal development, remember that each step, each insight, brings you closer to the fullest expression of your unique essence.",
                        style: "anotherStyle",
                        margin: [70, 0, 90, 5],
                        lineHeight: 1.2,
                      },

                      {
                        text: "Embrace this journey with an open heart and a curious mind, ready to discover and celebrate the richness of your inner world.",
                        style: "anotherStyle",
                        margin: [70, 0, 90, 13],
                        lineHeight: 1.2,
                      },
                    ],
                  },
                ],
              ],
            },
          },
        ],

        // Define the footer content with page numbers
        footer: function (currentPage, pageCount) {
          return currentPage != 1 && currentPage != 4
            ? {
                columns: [
                  {
                    // image: base64ImageArr.footer,
                    // width: 1200,
                    // // height: 841.89,
                    // absolutePosition: { x: 0, y: 0 },
                  },
                  {
                    text: "Copyright © Ventura eLearning Global",
                    style: "footer",
                    margin: [23, 13, 0, 0],
                  },
                  {
                    text: `Page ${currentPage.toString()}`,
                    style: "footer",
                    margin: [105, 13, 0, 0],
                  },
                ],
              }
            : {};
        },

        styles: {
          header: {
            fontSize: 15,
            bold: true,
            color: "#433B39",
          },
          headerlistmargin: {
            margin: [0, 20, 0, 0],
            bold: true,
          },
          headerdescription: {
            margin: [0, 6, 0, 4],
            bold: false,
            color: "#433B39",
          },

          headerlist: {
            fontSize: 12,
            bold: true,
            color: "#433B39",
            alignment: "left",
            margin: [0, 0, 0, 0],
          },
          Archetype: {
            fontSize: 12,
            bold: true,
            lineHeight: 1.4,
            alignment: "left",
            margin: [0, 0, 0, 5],
            color: "#433B39",
          },
          reportHeaderStyle: {
            alignment: "left",
            margin: [0, 6, 0, 20],
            color: "#433B39",
          },
          anotherStyle: {
            alignment: "left",
            lineHeight: 1.4,
            color: "#433B39",
            margin: [0, 0, 0, 10],
          },
          introductionheading: {
            fontSize: 5,
            bold: true,
            backgroundColor: "#433B39",
          },
          tableExample: {
            margin: [-40, 0, 0, 0],
          },
          footer: {
            fontSize: 10,
            color: "#433B39",
          },
        },

        defaultStyle: {
          font: "sanPro",
        },
      };
      const colors = ["#CD5C5C", "#F08080", "#008000"];

      // IT IS USE TO SET BACKGROUND COLOR OF PAGE WE CAN ALSO SET DIIFERENT COLOR FOR DIFFERENT PAGE ALSO IN THAT CASE WE NEED TO DEFINE  COLOR IN ARRAY OF COLORS
      // ALSO   color: colors[index - 1]  NEED TO DO index is basically  page number

      docDefinition.background = (index) => {
        const canvas = [
          {
            type: "rect",
            x: 0,
            y: 0,
            w: 595.28,
            h: 841.89,
            color: "#FFFAF6",
          },
        ];
        return { canvas };
      };

      // this code is use for save and generate pdf on serer
      const pdfDoc = pdfmake.createPdfKitDocument(docDefinition);
      pdfDoc.pipe(fs.createWriteStream(`uploads/${uniqueSuffix}_report.pdf`));
      pdfDoc.end();
      console.log(uniqueSuffix);
      res.status(201).json({ filename: `${uniqueSuffix}_report.pdf` });
    };

    const content = [
      { text: "Hello, this is a sample PDF!", fontSize: 16 },
      // Add more content as needed
    ];

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log("calling");
    generatePdf(content, uniqueSuffix);
  } else {
    console.log("data getting from request consist some field undefined");
    res.status(201).json({ error: `not passing correct parameter` });
  }

  //   createPdf();
});

module.exports = { pdfGenerationController };
