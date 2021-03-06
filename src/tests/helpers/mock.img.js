// Above mocks were made when running the pictuer analyzer on MacOS with the Color LCD color profile
// ideally use a third party site to generate a mock

const mockLightnessLCD = [
  ["0", 267],
  ["1", 229],
  ["2", 150],
  ["3", 193],
  ["4", 183],
  ["5", 155],
  ["6", 152],
  ["7", 146],
  ["8", 123],
  ["9", 118],
  ["10", 111],
  ["11", 119],
  ["12", 94],
  ["13", 101],
  ["14", 79],
  ["15", 93],
  ["16", 85],
  ["17", 81],
  ["18", 90],
  ["19", 75],
  ["20", 78],
  ["21", 73],
  ["22", 64],
  ["23", 60],
  ["24", 72],
  ["25", 55],
  ["26", 43],
  ["27", 44],
  ["28", 52],
  ["29", 57],
  ["30", 59],
  ["31", 33],
  ["32", 38],
  ["33", 47],
  ["34", 37],
  ["35", 32],
  ["36", 39],
  ["37", 45],
  ["38", 30],
  ["39", 40],
  ["40", 42],
  ["41", 37],
  ["42", 38],
  ["43", 41],
  ["44", 29],
  ["45", 38],
  ["46", 32],
  ["47", 39],
  ["48", 33],
  ["49", 32],
  ["50", 30],
  ["51", 26],
  ["52", 44],
  ["53", 34],
  ["54", 31],
  ["55", 36],
  ["56", 23],
  ["57", 35],
  ["58", 27],
  ["59", 31],
  ["60", 31],
  ["61", 31],
  ["62", 26],
  ["63", 24],
  ["64", 24],
  ["65", 25],
  ["66", 22],
  ["67", 35],
  ["68", 30],
  ["69", 21],
  ["70", 36],
  ["71", 36],
  ["72", 29],
  ["73", 44],
  ["74", 25],
  ["75", 34],
  ["76", 23],
  ["77", 32],
  ["78", 50],
  ["79", 44],
  ["80", 43],
  ["81", 38],
  ["82", 47],
  ["83", 47],
  ["84", 61],
  ["85", 53],
  ["86", 65],
  ["87", 74],
  ["88", 67],
  ["89", 80],
  ["90", 71],
  ["91", 73],
  ["92", 78],
  ["93", 84],
  ["94", 82],
  ["95", 91],
  ["96", 110],
  ["97", 123],
  ["98", 104],
  ["99", 135],
  ["100", 104],
  ["101", 119],
  ["102", 146],
  ["103", 144],
  ["104", 138],
  ["105", 146],
  ["106", 163],
  ["107", 166],
  ["108", 166],
  ["109", 176],
  ["110", 172],
  ["111", 177],
  ["112", 158],
  ["113", 203],
  ["114", 204],
  ["115", 203],
  ["116", 216],
  ["117", 207],
  ["118", 227],
  ["119", 208],
  ["120", 229],
  ["121", 225],
  ["122", 240],
  ["123", 236],
  ["124", 230],
  ["125", 235],
  ["126", 257],
  ["127", 266],
  ["128", 257],
  ["129", 266],
  ["130", 271],
  ["131", 257],
  ["132", 278],
  ["133", 302],
  ["134", 308],
  ["135", 295],
  ["136", 299],
  ["137", 315],
  ["138", 306],
  ["139", 320],
  ["140", 342],
  ["141", 302],
  ["142", 324],
  ["143", 320],
  ["144", 320],
  ["145", 316],
  ["146", 295],
  ["147", 335],
  ["148", 310],
  ["149", 327],
  ["150", 336],
  ["151", 375],
  ["152", 383],
  ["153", 398],
  ["154", 413],
  ["155", 444],
  ["156", 438],
  ["157", 430],
  ["158", 467],
  ["159", 447],
  ["160", 483],
  ["161", 490],
  ["162", 441],
  ["163", 395],
  ["164", 437],
  ["165", 459],
  ["166", 435],
  ["167", 416],
  ["168", 439],
  ["169", 457],
  ["170", 439],
  ["171", 407],
  ["172", 420],
  ["173", 460],
  ["174", 434],
  ["175", 421],
  ["176", 414],
  ["177", 417],
  ["178", 400],
  ["179", 404],
  ["180", 401],
  ["181", 374],
  ["182", 381],
  ["183", 398],
  ["184", 365],
  ["185", 397],
  ["186", 362],
  ["187", 337],
  ["188", 338],
  ["189", 405],
  ["190", 376],
  ["191", 326],
  ["192", 352],
  ["193", 329],
  ["194", 395],
  ["195", 446],
  ["196", 404],
  ["197", 441],
  ["198", 463],
  ["199", 459],
  ["200", 418],
  ["201", 436],
  ["202", 419],
  ["203", 409],
  ["204", 406],
  ["205", 428],
  ["206", 433],
  ["207", 433],
  ["208", 465],
  ["209", 512],
  ["210", 440],
  ["211", 457],
  ["212", 443],
  ["213", 455],
  ["214", 430],
  ["215", 463],
  ["216", 367],
  ["217", 384],
  ["218", 345],
  ["219", 337],
  ["220", 296],
  ["221", 354],
  ["222", 307],
  ["223", 314],
  ["224", 300],
  ["225", 311],
  ["226", 297],
  ["227", 284],
  ["228", 290],
  ["229", 287],
  ["230", 274],
  ["231", 228],
  ["232", 243],
  ["233", 298],
  ["234", 266],
  ["235", 252],
  ["236", 275],
  ["237", 279],
  ["238", 262],
  ["239", 298],
  ["240", 247],
  ["241", 251],
  ["242", 234],
  ["243", 295],
  ["244", 306],
  ["245", 341],
  ["246", 337],
  ["247", 319],
  ["248", 324],
  ["249", 348],
  ["250", 318],
  ["251", 409],
  ["252", 493],
  ["253", 920],
  ["254", 1646],
];

const mockHLLCD = [
  ["0", 1893],
  ["1", 2404],
  ["2", 1128],
  ["3", 845],
  ["4", 621],
  ["5", 452],
  ["6", 423],
  ["7", 386],
  ["8", 438],
  ["9", 385],
  ["10", 359],
  ["11", 382],
  ["12", 351],
  ["13", 318],
  ["14", 266],
  ["15", 250],
  ["16", 236],
  ["17", 165],
  ["18", 205],
  ["19", 186],
  ["20", 174],
  ["21", 153],
  ["22", 178],
  ["23", 140],
  ["24", 158],
  ["25", 134],
  ["26", 118],
  ["27", 124],
  ["28", 101],
  ["29", 118],
  ["30", 117],
  ["31", 85],
  ["32", 97],
  ["33", 85],
  ["34", 94],
  ["35", 71],
  ["36", 72],
  ["37", 69],
  ["38", 47],
  ["39", 46],
  ["40", 45],
  ["41", 60],
  ["42", 50],
  ["43", 62],
  ["44", 49],
  ["45", 55],
  ["46", 53],
  ["47", 48],
  ["48", 59],
  ["49", 44],
  ["50", 51],
  ["51", 53],
  ["52", 56],
  ["53", 34],
  ["54", 29],
  ["55", 24],
  ["56", 38],
  ["57", 33],
  ["58", 30],
  ["59", 37],
  ["60", 26],
  ["61", 35],
  ["62", 38],
  ["63", 41],
  ["64", 33],
  ["65", 27],
  ["66", 40],
  ["67", 43],
  ["68", 35],
  ["69", 37],
  ["70", 42],
  ["71", 39],
  ["72", 26],
  ["73", 45],
  ["74", 56],
  ["75", 51],
  ["76", 66],
  ["77", 78],
  ["78", 86],
  ["79", 73],
  ["80", 68],
  ["81", 57],
  ["82", 50],
  ["83", 60],
  ["84", 51],
  ["85", 40],
  ["86", 49],
  ["87", 39],
  ["88", 53],
  ["89", 50],
  ["90", 51],
  ["91", 45],
  ["92", 53],
  ["93", 56],
  ["94", 66],
  ["95", 82],
  ["96", 95],
  ["97", 93],
  ["98", 107],
  ["99", 104],
  ["100", 113],
  ["101", 89],
  ["102", 102],
  ["103", 77],
  ["104", 90],
  ["105", 103],
  ["106", 122],
  ["107", 109],
  ["108", 148],
  ["109", 139],
  ["110", 159],
  ["111", 150],
  ["112", 166],
  ["113", 178],
  ["114", 172],
  ["115", 169],
  ["116", 171],
  ["117", 169],
  ["118", 134],
  ["119", 127],
  ["120", 155],
  ["121", 150],
  ["122", 209],
  ["123", 317],
  ["124", 931],
  ["125", 1973],
  ["126", 1929],
  ["127", 2261],
  ["128", 2941],
  ["129", 2707],
  ["130", 1709],
  ["131", 803],
  ["132", 455],
  ["133", 256],
  ["134", 190],
  ["135", 140],
  ["136", 126],
  ["137", 108],
  ["138", 94],
  ["139", 75],
  ["140", 65],
  ["141", 67],
  ["142", 73],
  ["143", 66],
  ["144", 61],
  ["145", 50],
  ["146", 54],
  ["147", 42],
  ["148", 51],
  ["149", 43],
  ["150", 44],
  ["151", 51],
  ["152", 38],
  ["153", 44],
  ["154", 47],
  ["155", 30],
  ["156", 34],
  ["157", 37],
  ["158", 42],
  ["159", 35],
  ["160", 33],
  ["161", 39],
  ["162", 26],
  ["163", 36],
  ["164", 27],
  ["165", 36],
  ["166", 24],
  ["167", 22],
  ["168", 27],
  ["169", 21],
  ["170", 23],
  ["171", 33],
  ["172", 34],
  ["173", 15],
  ["174", 27],
  ["175", 23],
  ["176", 24],
  ["177", 28],
  ["178", 10],
  ["179", 25],
  ["180", 17],
  ["181", 34],
  ["182", 17],
  ["183", 23],
  ["184", 21],
  ["185", 22],
  ["186", 25],
  ["187", 15],
  ["188", 18],
  ["189", 24],
  ["190", 19],
  ["191", 23],
  ["192", 15],
  ["193", 17],
  ["194", 19],
  ["195", 12],
  ["196", 24],
  ["197", 18],
  ["198", 16],
  ["199", 22],
  ["200", 22],
  ["201", 22],
  ["202", 11],
  ["203", 15],
  ["204", 20],
  ["205", 10],
  ["206", 13],
  ["207", 14],
  ["208", 12],
  ["209", 11],
  ["210", 14],
  ["211", 18],
  ["212", 17],
  ["213", 11],
  ["214", 14],
  ["215", 16],
  ["216", 10],
  ["217", 18],
  ["218", 9],
  ["219", 4],
  ["220", 12],
  ["221", 14],
  ["222", 12],
  ["223", 9],
  ["224", 10],
  ["225", 9],
  ["226", 13],
  ["227", 11],
  ["228", 14],
  ["229", 7],
  ["230", 18],
  ["231", 11],
  ["232", 11],
  ["233", 10],
  ["234", 14],
  ["235", 20],
  ["236", 6],
  ["237", 16],
  ["238", 13],
  ["239", 18],
  ["240", 11],
  ["241", 14],
  ["242", 16],
  ["243", 12],
  ["244", 26],
  ["245", 17],
  ["246", 18],
  ["247", 18],
  ["248", 28],
  ["249", 26],
  ["250", 17],
  ["251", 26],
  ["252", 30],
  ["253", 36],
  ["254", 17],
]

export { mockLightnessLCD , mockHLLCD};