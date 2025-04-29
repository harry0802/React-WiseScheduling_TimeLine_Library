// @ts-check

/**
 * @class ProductionZonePage
 * @description 工廠生產區域頁面的頁面對象模型
 */
export default class ProductionZonePage {
  /**
   * @constructor
   * @param {import('@playwright/test').Page} page - Playwright 頁面實例
   */
  constructor(page) {
    this.page = page

    // 定義元素選擇器
    this.selectors = {
      dashboardCard: '.dashboard-card, [data-testid="dashboard-card"]',
      equipmentId: '.equipment-id, [data-testid="equipment-id"]',
      equipmentModel: '.equipment-model, [data-testid="equipment-model"]',
      goodRate: '.good-rate, [data-testid="good-rate"]',
      completionRate: '.completion-rate, [data-testid="completion-rate"]',
      detailsPanel: '.equipment-details, [data-testid="equipment-details"]'
    }
  }

  /**
   * @method 導航到生產區域頁面
   * @param {string} zone - 區域標識符 (a, b, c, d)
   */
  async navigateTo(zone = 'a') {
    await this.page.goto(`/dashboard/zones/${zone}`)
    await this.page.waitForSelector(this.selectors.dashboardCard)
  }

  /**
   * @method 獲取所有設備卡片
   * @returns {Promise<import('@playwright/test').Locator[]>} 卡片定位器陣列
   */
  async getAllCards() {
    return await this.page.locator(this.selectors.dashboardCard).all()
  }

  /**
   * @method 獲取卡片數量
   * @returns {Promise<number>} 卡片數量
   */
  async getCardCount() {
    const cards = await this.getAllCards()
    return cards.length
  }

  /**
   * @method 獲取卡片狀態
   * @param {number} index - 卡片索引
   * @returns {Promise<string>} 卡片狀態值
   */
  async getCardStatus(index = 0) {
    const cards = await this.getAllCards()
    if (index >= cards.length) {
      throw new Error(`卡片索引 ${index} 超出範圍 (共 ${cards.length} 張卡片)`)
    }
    return (await cards[index].getAttribute('data-status')) || ''
  }

  /**
   * @method 獲取設備ID
   * @param {number} index - 卡片索引
   * @returns {Promise<string>} 設備ID文本
   */
  async getEquipmentId(index = 0) {
    const cards = await this.getAllCards()
    if (index >= cards.length) {
      throw new Error(`卡片索引 ${index} 超出範圍 (共 ${cards.length} 張卡片)`)
    }
    const idElement = await cards[index]
      .locator(this.selectors.equipmentId)
      .first()
    return (await idElement.textContent()) || ''
  }

  /**
   * @method 點擊卡片
   * @param {number} index - 卡片索引
   */
  async clickCard(index = 0) {
    const cards = await this.getAllCards()
    if (index >= cards.length) {
      throw new Error(`卡片索引 ${index} 超出範圍 (共 ${cards.length} 張卡片)`)
    }
    await cards[index].click()
    // 等待詳細信息面板顯示
    await this.page.waitForSelector(this.selectors.detailsPanel, {
      timeout: 5000
    })
  }

  /**
   * @method 獲取良率
   * @param {number} index - 卡片索引
   * @returns {Promise<string>} 良率文本
   */
  async getGoodRate(index = 0) {
    const cards = await this.getAllCards()
    if (index >= cards.length) {
      throw new Error(`卡片索引 ${index} 超出範圍 (共 ${cards.length} 張卡片)`)
    }
    const rateElement = await cards[index]
      .locator(this.selectors.goodRate)
      .first()
    return (await rateElement.textContent()) || ''
  }

  /**
   * @method 獲取完成率
   * @param {number} index - 卡片索引
   * @returns {Promise<string>} 完成率文本
   */
  async getCompletionRate(index = 0) {
    const cards = await this.getAllCards()
    if (index >= cards.length) {
      throw new Error(`卡片索引 ${index} 超出範圍 (共 ${cards.length} 張卡片)`)
    }
    const rateElement = await cards[index]
      .locator(this.selectors.completionRate)
      .first()
    return (await rateElement.textContent()) || ''
  }

  /**
   * @method 切換視口大小
   * @param {string} deviceType - 設備類型 (desktop, tablet, mobile)
   */
  async switchViewport(deviceType) {
    switch (deviceType.toLowerCase()) {
      case 'desktop':
        await this.page.setViewportSize({ width: 1280, height: 800 })
        break
      case 'tablet':
        await this.page.setViewportSize({ width: 768, height: 1024 })
        break
      case 'mobile':
        await this.page.setViewportSize({ width: 375, height: 667 })
        break
      default:
        throw new Error(`未知設備類型: ${deviceType}`)
    }
    // 等待佈局調整
    await this.page.waitForTimeout(500)
  }

  /**
   * @method 截取當前視口截圖
   * @param {string} filePath - 截圖保存路徑
   */
  async takeScreenshot(filePath) {
    await this.page.screenshot({ path: filePath })
  }
}

