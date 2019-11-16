var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

const mock = new MockAdapter(axios);

// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock.onPost("http://167.172.44.51:1323/photo").reply(200, {
  results: [
    {
      resourceType: "recipe",
      Id: "6910",
      Name: "Nutella-laskiaispulla",
      Url: "http://www.k-ruoka.fi/reseptit/nutella-laskiaispulla",
      UrlSlug: "nutella-laskiaispulla",
      PieceSize: {
        Amount: "270",
        Unit: "g"
      },
      PortionCost: "0.99",
      Portions: {
        Amount: "6",
        Unit: "annosta"
      },
      PreparationTime: {
        Description: "yli 60 min",
        TimeRange: {
          MinTime: 5,
          MaxTime: 15
        }
      },
      Categories: [
        {
          MainId: "4",
          MainName: "Pääruoat",
          SubId: "30",
          SubName: "Uuniruoat"
        }
      ],
      Pictures: ["PI1015_spagettivuoka"],
      PictureUrls: [
        {
          Id: "PI1015_spagettivuoka",
          Normal:
            "http://kesko-k-ruoka-recipe-images-dev.s3-website.eu-central-1.amazonaws.com/PI1015_spagettivuoka.jpg",
          Original: "string"
        }
      ],
      VideoUrl: "https://www.youtube.com/watch?v=O_mE4-vZOUc",
      VideoEmbedUrl:
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/O_mE4-vZOUc" frameborder="0" allowfullscreen></iframe>',
      TrendWords: [
        {
          Id: "3",
          Name: "Luomu"
        }
      ],
      SpecialDiets: [
        {
          Id: "3",
          Name: "Maidoton"
        }
      ],
      EnergyAmounts: {
        CarbohydratePerPortion: "42.00",
        CarbohydratePerUnit: "15.56",
        FatPerPortion: "26.00",
        FatPerUnit: "9.63",
        KJPerPortion: "2020.00",
        KJPerUnit: "748.15",
        KcalPerPortion: "480.00",
        KcalPerUnit: "178.81",
        ProteinPerPortion: "22.00",
        ProteinPerUnit: "8.15"
      },
      Ingredients: [
        {
          SubSectionHeading: "_",
          SubSectionIngredients: [
            [
              {
                Amount: "6",
                Name: "broilerin rintafileepihviä",
                PackageRecipe: "false",
                Unit: ""
              }
            ],
            [
              {
                Amount: "n. 100",
                Name: "yrtti- tai pippurituorejuustoa",
                PackageRecipe: "false",
                Unit: "g"
              }
            ],
            [
              {
                Amount: "1-2",
                Name: "öljyä",
                PackageRecipe: "false",
                Unit: "rkl"
              }
            ],
            [
              {
                Amount: "1-2",
                Name: "sipulia",
                PackageRecipe: "false",
                Unit: ""
              },
              {
                Amount: "1/2",
                AmountInfo: "(100 g)",
                Name: "pakastettuja sipulikuutioita",
                PackageRecipe: "false",
                Unit: "ps"
              }
            ],
            [
              {
                Amount: "2",
                Name: "appelsiinia",
                PackageRecipe: "false",
                Unit: ""
              },
              {
                Amount: "1",
                AmountInfo: "(425 g)",
                Name: "persikoita",
                PackageRecipe: "false",
                Unit: "tlk"
              }
            ],
            [
              {
                Amount: "1",
                Name: "vettä",
                PackageRecipe: "false",
                Unit: "dl"
              }
            ],
            [
              {
                AmountInfo: "ripaus",
                Name: "mustapippuria",
                PackageRecipe: "false"
              }
            ],
            [
              {
                Name: "persiljaa tai kirveliä",
                PackageRecipe: "false"
              }
            ]
          ]
        }
      ],
      Instructions: "string",
      EndNote:
        "Vinkki! Voit lisätä joukkoon myös marjoja, esimerkiksi mustikoita.\n",
      Description:
        "Broilerijauhelihakastike on helppo, nopea ja maistuva arkiruoka.\n",
      DateCreated: "2014-03-18T09:16:30Z",
      TvDate: "2013-02-21T00:00:00Z",
      DateModified: "2017-08-30T13:15:39Z",
      RecipeUse: {
        Id: "1",
        Name: "pirkka.fi"
      },
      Stamp: {
        Id: "1",
        Name: "Testattu K-koekeittiössä"
      },
      Sort: [14.238281, 2]
    }
  ]
});
