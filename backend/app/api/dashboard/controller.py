from flask_restx import Resource
from app.utils_log import controller_entrance_log
from .service import DashboardService
from .dto import DashboardDto
api = DashboardDto.api


@api.route("/todayWorkOrder")
class DashboardTodayWorkOrderController(Resource):
    todayWorkOrder_resp = DashboardDto.todayWorkOrder_resp

    @api.doc(description="""本日生產任務
             列出所有預計上機日為當天的製令單。"""
            )
    @api.doc(
        "Get todayWorkOrder",
        responses={
            200: ("todayWorkOrder data successfully sent", todayWorkOrder_resp),
            404: "todayWorkOrder not found",
        },
    )
    @controller_entrance_log(description="Get todayWorkOrder")
    def get(self):
        return DashboardService.get_todayWorkOrder()
    

@api.route("/overdueWorkOrder")
class DashboardOverdueWorkOrderController(Resource):
    overdueWorkOrder_resp = DashboardDto.overdueWorkOrder_resp

    @api.doc(description="""生產逾期任務
             列出所有預計完成日前七天或者過了預計完成日還沒完成的的製令單。"""
            )
    @api.doc(
        "Get overdueWorkOrder",
        responses={
            200: ("overdueWorkOrder data successfully sent", overdueWorkOrder_resp),
            404: "overdueWorkOrder not found",
        },
    )
    @controller_entrance_log(description="Get overdueWorkOrder")
    def get(self):
        return DashboardService.get_overdueWorkOrder()
    

@api.route("/machineAccumulatedTime")
class DashboardMachineAccumulatedTimeController(Resource):
    machineAccumulatedTime_resp = DashboardDto.machineAccumulatedTime_resp

    @api.doc(description="""設備即時狀態
             列出所有設備機台當天累積的生產/調機/停機/試模/待機時間和目前機台狀態。"""
            )
    @api.doc(
        "Get machineAccumulatedTime",
        responses={
            200: ("machineAccumulatedTime data successfully sent", machineAccumulatedTime_resp),
            404: "machineAccumulatedTime not found",
        },
    )
    @controller_entrance_log(description="Get machineAccumulatedTime")
    def get(self):
        return DashboardService.get_machineAccumulatedTime()


@api.route("/machineStatusProportion")
class DashboardMachineStatusProportionController(Resource):
    machineStatusProportion_resp = DashboardDto.machineStatusProportion_resp

    @api.doc(description="""機台各狀態時間佔比
             加總所有設備機台當天累積的生產/調機/停機/試模/待機時間，並以佔比顯示。"""
            )
    @api.doc(
        "Get machineStatusProportion",
        responses={
            200: ("machineStatusProportion data successfully sent", machineStatusProportion_resp),
            404: "machineStatusProportion not found",
        },
    )
    @controller_entrance_log(description="Get machineStatusProportion")
    def get(self):
        return DashboardService.get_machineStatusProportion()


@api.route("/machineOfflineEvent")
class DashboardMachineOfflineEventController(Resource):
    machineOfflineEvent_resp = DashboardDto.machineOfflineEvent_resp

    @api.doc(description="""設備異常事件
             列出當天有停機狀態的設備，發生時間以及原因。"""
            )
    @api.doc(
        "Get machineOfflineEvent",
        responses={
            200: ("machineOfflineEvent data successfully sent", machineOfflineEvent_resp),
            404: "machineOfflineEvent not found",
        },
    )
    @controller_entrance_log(description="Get machineOfflineEvent")
    def get(self):
        return DashboardService.get_machineOfflineEvent()


@api.route("/currentMachineStatusCount")
class DashboardMachineOfflineEventController(Resource):
    currentMachineStatusCount_resp = DashboardDto.currentMachineStatusCount_resp

    @api.doc(description="""當下機台狀態的台數
             當天所有設備機台的狀態台數統計，包含生產中、待機中、上模與調機、產品試模、機台停機等狀態的設備數量。
             狀態時數統計請用 /machineStatusProportion API。"""
            )
    @api.doc(
        "Get currentMachineStatusCount",
        responses={
            200: ("currentMachineStatusCount data successfully sent", currentMachineStatusCount_resp),
            404: "currentMachineStatusCount not found",
        },
    )
    @controller_entrance_log(description="Get currentMachineStatusCount")
    def get(self):
        return DashboardService.get_currentMachineStatusCount()
    

@api.route("/todayWorkOrderWithProcess")
class DashboardMachineOfflineEventController(Resource):
    todayWorkOrderWithProcess_resp = DashboardDto.todayWorkOrderWithProcess_resp

    @api.doc(description="""生產進度追蹤即時戰情-本日生產任務
             列出預計上機日為當天的製令單，包含製令交期、製令單號、產品名稱、製令數量、一射、二射等資訊。"""
            )
    @api.doc(
        "Get todayWorkOrderWithProcess",
        responses={
            200: ("todayWorkOrderWithProcess data successfully sent", todayWorkOrderWithProcess_resp),
            404: "todayWorkOrderWithProcess not found",
        },
    )
    @controller_entrance_log(description="Get todayWorkOrderWithProcess")
    def get(self):
        return DashboardService.get_todayWorkOrderWithProcess()
    

@api.route("/machineOfflineReasonProportion")
class DashboardMachineOfflineReasonProportionController(Resource):
    machineOfflineReasonProportion_resp = DashboardDto.machineOfflineReasonProportion_resp

    @api.doc(description="""停機因素占比分析
             加總所有設備機台當天累積的不同原因累積的停機時間。"""
            )
    @api.doc(
        "Get machineOfflineReasonProportion",
        responses={
            200: ("machineOfflineReasonProportion data successfully sent", machineOfflineReasonProportion_resp),
            404: "machineOfflineReasonProportion not found",
        },
    )
    @controller_entrance_log(description="Get machineOfflineReasonProportion")
    def get(self):
        return DashboardService.get_machineOfflineReasonProportion()
    


@api.route("/machineStatusHoursStatistics")
class DashboardMachineStatusHoursStatisticsController(Resource):
    machineStatusHoursStatistics_resp = DashboardDto.machineStatusHoursStatistics_resp

    @api.doc(description="""當日機台各狀態時數統計
             加總各個機台當天累積的生產/調機/停機/試模/待機時間。"""
            )
    @api.doc(
        "Get machineStatusHoursStatistics",
        responses={
            200: ("machineStatusHoursStatistics data successfully sent", machineStatusHoursStatistics_resp),
            404: "machineStatusHoursStatistics not found",
        },
    )
    @controller_entrance_log(description="Get machineStatusHoursStatistics")
    def get(self):
        return DashboardService.get_machineStatusHoursStatistics()
    

@api.route("/machineUtilizationStatistics")
class DashboardMachineUtilizationStatisticsController(Resource):
    machineUtilizationStatistics_resp = DashboardDto.machineUtilizationStatistics_resp

    @api.doc(description="""設備稼動分析 (尚未完成，先串其他API)
            1.「稼動時間 」=當天所有機台「生產時間 」(機)的總合
            2. 「稼動率」=「所有機台「生產中」時間」(機)/(「所有機台*24*60」(機)-「所有待機中的機台待機時間」(機)-「所有上模調機的時間」(機))*100%時間範圍為每天00:00-24:00
            3.「生產機台數」=目前為「生產中」的機台數總合
            4.「停機次數」=累計當天所有機台「停機」的次數
             """
            )
    @api.doc(
        "Get machineUtilizationStatistics",
        responses={
            200: ("machineUtilizationStatistics data successfully sent", machineUtilizationStatistics_resp),
            404: "machineUtilizationStatistics not found",
        },
    )
    @controller_entrance_log(description="Get machineUtilizationStatistics")
    def get(self):
        return DashboardService.get_machineUtilizationStatistics()