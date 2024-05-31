#### 日期: 2024-05-31

- Git Commit：Add foreign key to productionReport table
- 修改：ProductionReport 資料表新增 foreign key 對應到 ProductionSchedule 資料表的 id。並修改前端與後端用製令單編號來做判斷的相關程式。
- 修改原因：原本 ProductionReport 資料表沒有 foreign key，是使用製令單編號來取得 ProductionSchedule 資料表。但製令單編號不具有唯一值特性，可能會有相同製令單號不同機台、相同製令單號不同模具編號的情況，所以 ProductionReport 資料表新增 foreign key 對應到 ProductionSchedule 資料表的 id，以確保取得或更新 ProductionSchedule 資料表都正確。
