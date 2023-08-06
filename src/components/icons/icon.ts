import { IconSets } from './icon-sets'

export class Icon {
  set: IconSets
  name: string
  type?: string

  constructor(set: IconSets, name: string, type?: string) {
    this.set = set
    this.name = name
    this.type = type
  }

  static bootstrap(name: string): Icon {
    return new Icon(IconSets.bootstrap, name)
  }

  static boxicons(name: string, type?: 'solid' | 'regular' | 'logos'): Icon {
    return new Icon(IconSets.boxicons, name, type)
  }

  static bytesize(name: string): Icon {
    return new Icon(IconSets.bytesize, name)
  }

  static cssgg(name: string): Icon {
    return new Icon(IconSets.cssgg, name)
  }

  static emojicc(name: string): Icon {
    return new Icon(IconSets.emojicc, name)
  }

  static eos(name: string, type?: 'solid' | 'outlined' | 'animated'): Icon {
    return new Icon(IconSets.eos, name, type)
  }

  static feather(name: string): Icon {
    return new Icon(IconSets.feather, name)
  }

  static flags(name: string, type?: '4x3' | '1x1'): Icon {
    return new Icon(IconSets.flags, name, type)
  }

  static fontawesome(
    name: string,
    type?: 'solid' | 'regular' | 'brands' | 'light' | 'duotone',
  ): Icon {
    return new Icon(IconSets.fontawesome, name, type)
  }

  static iconoir(name: string): Icon {
    return new Icon(IconSets.iconoir, name)
  }

  static iconpark(
    name: string,
    type?:
      | 'Abstract'
      | 'Animals'
      | 'Arrows'
      | 'Baby'
      | 'Base'
      | 'Brand'
      | 'Build'
      | 'Character'
      | 'Charts'
      | 'Clothes'
      | 'Communicate'
      | 'Components'
      | 'Connect'
      | 'Constellation'
      | 'Datas'
      | 'Edit'
      | 'Emoji'
      | 'Energy'
      | 'Foods'
      | 'Game'
      | 'Graphics'
      | 'Hands'
      | 'Hardware'
      | 'Health'
      | 'Industry'
      | 'Life'
      | 'Makeups'
      | 'Measurement'
      | 'Money'
      | 'Music'
      | 'Office'
      | 'Operate'
      | 'Others'
      | 'Peoples'
      | 'Safe'
      | 'Sports'
      | 'Time'
      | 'Travel'
      | 'Weather',
  ): Icon {
    return new Icon(IconSets.iconpark, name, type)
  }

  static lucide(name: string): Icon {
    return new Icon(IconSets.lucide, name)
  }

  static material(
    name: string,
    type?: 'filled' | 'outlined' | 'round' | 'sharp' | 'two-tone',
  ): Icon {
    return new Icon(IconSets.material, name, type)
  }

  static phosphor(
    name: string,
    type?: 'regular' | 'bold' | 'duotone' | 'fill' | 'light' | 'thin',
  ): Icon {
    return new Icon(IconSets.phosphor, name, type)
  }

  static supertiny(name: string): Icon {
    return new Icon(IconSets.supertiny, name)
  }

  static symbols(name: string, type?: 'outlined' | 'rounded' | 'sharp'): Icon {
    return new Icon(IconSets.symbols, name, type)
  }

  static tabler(name: string): Icon {
    return new Icon(IconSets.tabler, name)
  }
}

// export type Icon =
//   | { set: IconSets.bootstrap; name: string }
//   | {
//       set: IconSets.boxicons
//       name: string
//       type: 'solid' | 'regular' | 'logos'
//     }
//   | { set: IconSets.bytesize; name: string }
//   | { set: IconSets.cssgg; name: string }
//   | { set: IconSets.emojicc; name: string }
//   | { set: IconSets.eos; name: string; type: 'solid' | 'outlined' | 'animated' }
//   | { set: IconSets.feather; name: string }
//   | { set: IconSets.flags; name: string; type: '4x3' | '1x1' }
//   | {
//       set: IconSets.fontawesome
//       name: string
//       type: 'solid' | 'regular' | 'brands' | 'light' | 'duotone'
//     }
//   | { set: IconSets.iconoir; name: string }
//   | {
//       set: IconSets.iconpark
//       name: string
//       type:
//         | 'Abstract'
//         | 'Animals'
//         | 'Arrows'
//         | 'Baby'
//         | 'Base'
//         | 'Brand'
//         | 'Build'
//         | 'Character'
//         | 'Charts'
//         | 'Clothes'
//         | 'Communicate'
//         | 'Components'
//         | 'Connect'
//         | 'Constellation'
//         | 'Datas'
//         | 'Edit'
//         | 'Emoji'
//         | 'Energy'
//         | 'Foods'
//         | 'Game'
//         | 'Graphics'
//         | 'Hands'
//         | 'Hardware'
//         | 'Health'
//         | 'Industry'
//         | 'Life'
//         | 'Makeups'
//         | 'Measurement'
//         | 'Money'
//         | 'Music'
//         | 'Office'
//         | 'Operate'
//         | 'Others'
//         | 'Peoples'
//         | 'Safe'
//         | 'Sports'
//         | 'Time'
//         | 'Travel'
//         | 'Weather'
//     }
//   | { set: IconSets.lucide; name: string }
//   | {
//       set: IconSets.material
//       name: string
//       type: 'filled' | 'outlined' | 'round' | 'sharp' | 'two-tone'
//     }
//   | {
//       set: IconSets.phosphor
//       name: string
//       type: 'regular' | 'bold' | 'duotone' | 'fill' | 'light' | 'thin'
//     }
//   | { set: IconSets.supertiny; name: string }
//   | {
//       set: IconSets.symbols
//       name: string
//       type: 'outlined' | 'rounded' | 'sharp'
//     }
//   | { set: IconSets.tabler; name: string }
