function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

function ConjuredItem(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []

const AGED_BRIE = 'Aged Brie';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';

function update_quality() {
  function updateBackstagePasses(item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1
      if (item.quality < 50 && item.sell_in < 5) {
        item.quality = item.quality + 1
      }
      if (item.quality < 50 && item.sell_in < 10) {
        item.quality = item.quality + 1
      }
    }
    if (item.sell_in < 0) {
      item.quality = 0;
    }
  }

  function updateAgedBrie(item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1
      if (item.quality < 50 && item.sell_in < 0) {
        item.quality = item.quality + 1;
      }
    }
  }

  function updateBasicItem(item) {
    if (item.quality > 0) {
      item.quality = item.quality - 1
      if (item.quality > 0 && item.sell_in < 0) {
        item.quality = item.quality - 1
      }
    }
  }

  function updateConjuredItem(startingQuality, item) {
    const normalAmountDegraded = startingQuality - item.quality;
    const totalDegraded = normalAmountDegraded > 0 ? item.quality - normalAmountDegraded : item.quality;
    item.quality = totalDegraded >= 0 ? totalDegraded : 0
  }

  items.forEach((item) => {
    if (item.name === SULFURAS) {
      return;
    }
    const startingQuality = item.quality;
    item.sell_in = item.sell_in - 1;
    switch (item.name) {
      case BACKSTAGE_PASSES: updateBackstagePasses(item);
      break;
      case AGED_BRIE: updateAgedBrie(item);
      break;
      default: updateBasicItem(item);
    }
    if (item instanceof ConjuredItem) {
      updateConjuredItem(startingQuality, item);
    }
  });
}
