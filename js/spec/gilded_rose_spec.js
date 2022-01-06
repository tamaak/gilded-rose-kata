describe("Gilded Rose", function () {
  const AGED_BRIE = 'Aged Brie';
  const SULFURAS = 'Sulfuras, Hand of Ragnaros';
  const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';
  function rollAD20() {
    return Math.floor(Math.random() * 19) + 1;
  }

  function rollAD5() {
    return Math.floor(Math.random() * 4) + 1;
  }

  describe("when a normal item", function () {
    it("should decrease quality", function () {
      const randomQuality = rollAD20();
      const expectedQuality = randomQuality - 1;
      items = [new Item("foo", rollAD20(), randomQuality)];

      update_quality();

      expect(items[0].quality).toEqual(expectedQuality);
    });

    it("should decrease sell_in", function () {
      const randomSellIn = rollAD20();
      const expectedSellIn = randomSellIn - 1;
      items = [new Item("bar", randomSellIn, rollAD20())];

      update_quality();

      expect(items[0].sell_in).toEqual(expectedSellIn);
    });

    it("should degrade faster after sell_in is 0", function () {
      const randomQuality = rollAD20() + 1;
      const expectedQuality = randomQuality - 2;
      items = [new Item("baz", 0, randomQuality)];

      update_quality();

      expect(items[0].quality).toEqual(expectedQuality);
    });
  });

  describe(`when ${AGED_BRIE}`, function () {
    it("should improve quality", function () {
      const randomQuality = rollAD20();
      const expectedQuality = randomQuality + 1;
      items = [new Item(AGED_BRIE, rollAD20(), randomQuality)];

      update_quality();

      expect(items[0].quality).toEqual(expectedQuality);
    });

    it("should decrease sell_in", function () {
      const randomSellIn = rollAD20();
      const expectedSellIn = randomSellIn - 1;
      items = [new Item(AGED_BRIE, randomSellIn, rollAD20())];

      update_quality();

      expect(items[0].sell_in).toEqual(expectedSellIn);
    });

    // cheese lasts forever?!
    // it("should degrade faster after sell_in is 0", function () {
    //   const randomQuality = rollAD20() + 1;
    //   const expectedQuality = randomQuality - 2;
    //   items = [new Item(AGED_BRIE, 0, randomQuality)];
    //
    //   update_quality();
    //
    //   expect(items[0].quality).toEqual(expectedQuality);
    // });

    it("should not upgrade higher than 50", function () {
      items = [new Item(AGED_BRIE, rollAD20(), 50)];

      update_quality();

      expect(items[0].quality).toEqual(50);
    });
  });

  describe(`when ${SULFURAS}`, function () {
    it("should not decrease quality", function () {
      const randomQuality = rollAD20();
      items = [new Item(SULFURAS, rollAD20(), randomQuality)];

      update_quality();

      expect(items[0].quality).toEqual(randomQuality);
    });

    it("should not decrease sell_in", function () {
      const randomSellIn = rollAD20();
      items = [new Item(SULFURAS, randomSellIn, rollAD20())];

      update_quality();

      expect(items[0].sell_in).toEqual(randomSellIn);
    });
  });

  describe(`when ${BACKSTAGE_PASSES}`, function () {
    it("should improve quality when greater than 10", function () {
      const randomQuality = rollAD20();
      const sellInGreaterThan10 = rollAD20() + 10
      const expectedQuality = randomQuality + 1;
      items = [new Item(BACKSTAGE_PASSES, sellInGreaterThan10, randomQuality)];

      update_quality();

      expect(items[0].quality).toEqual(expectedQuality);
    });

    it("should improve quality by 2 when between 10 and 5 remaining days", function () {
      const randomQuality = rollAD20();
      const randomSellIn = rollAD5() + 5;
      const expectedQuality = randomQuality + 2;
      items = [new Item(BACKSTAGE_PASSES, randomSellIn, randomQuality)];

      update_quality();

      expect(items[0].quality).toEqual(expectedQuality);
    });

    it("should improve quality by 3 when less than 5 remaining days", function () {
      const randomQuality = rollAD20();
      const randomSellIn = rollAD5();
      const expectedQuality = randomQuality + 3;
      items = [new Item(BACKSTAGE_PASSES, randomSellIn, randomQuality)];

      update_quality();

      expect(items[0].quality).toEqual(expectedQuality);
    });

    it("should reset to 0 quality after sell_in expires", function () {
      items = [new Item(BACKSTAGE_PASSES, 0, rollAD20())];

      update_quality();

      expect(items[0].quality).toEqual(0);
    });
  });

  describe("when a conjured item", function () {
    it("should decrease quality", function () {
      const randomQuality = rollAD20();
      const expectedQuality = randomQuality - 2;
      items = [new ConjuredItem("foo", rollAD20(), randomQuality)];

      update_quality();

      expect(items[0].quality).toEqual(expectedQuality);
    });

    it("should decrease sell_in", function () {
      const randomSellIn = rollAD20();
      const expectedSellIn = randomSellIn - 1;
      items = [new ConjuredItem("bar", randomSellIn, rollAD20())];

      update_quality();

      expect(items[0].sell_in).toEqual(expectedSellIn);
    });

    it("should degrade faster after sell_in is 0", function () {
      const randomQuality = rollAD20() + 1;
      const expectedQuality = randomQuality - 4;
      items = [new ConjuredItem("baz", 0, randomQuality)];

      update_quality();

      expect(items[0].quality).toEqual(expectedQuality);
    });

    it(`should improve quality of ${AGED_BRIE} by normal amount`, function () {
      const randomQuality = rollAD20();
      const expectedQuality = randomQuality + 1;
      items = [new ConjuredItem(AGED_BRIE, rollAD20(), randomQuality)];

      update_quality();

      expect(items[0].quality).toEqual(expectedQuality);
    });

  });

  it("should not degrade below 0", function () {
    items = [
      new Item("foo", 0, 1),
      new Item("foo", 1, 0),
      new ConjuredItem("foo", 0, 3),
      new ConjuredItem("foo", 0, 1)
    ];

    update_quality();

    expect(items[0].quality).toEqual(0);
    expect(items[1].quality).toEqual(0);
    expect(items[2].quality).toEqual(0);
    expect(items[3].quality).toEqual(0);
  });
});
