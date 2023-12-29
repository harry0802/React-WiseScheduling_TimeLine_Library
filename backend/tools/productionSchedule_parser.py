import os
import sys, getopt
import logging
import requests
from openpyxl import load_workbook
from datetime import datetime

# parse data from excel file, and insert into database

table_name = 'productionSchedule'
ServerName = os.getenv('SERVER_NAME', 'http://localhost:5000')
api_url = f"{ServerName}/api/productionSchedule"
column_names = [
    # 'id',
    'productionArea',
    'machineSN',
    'serialNumber',
    'workOrderSN',
    'productSN',
    'productName',
    'workOrderQuantity',
    'workOrderDate',
    'moldingSecond',
    'hourlyCapacity',
    'dailyCapacity',
    'planOnMachineDate',
    # 'actualOnMachineDate',
    'moldWorkDays',
    'workDays',
    'planFinishDate',
    'actualFinishDate',
    'comment',
    'dailyWorkingHours',
    'moldCavity',
    'week',
    'singleOrDoubleColor',
    'conversionRate',
    'status',
]

excel_mapping = {
    "productionArea": "A",
    "machineSN": "B",
    "serialNumber": "C",
    "workOrderSN": "D",
    "productSN": "E",
    "productName": "F",
    "workOrderQuantity": "G",
    "workOrderDate": "H",
    "moldingSecond": "I",
    "hourlyCapacity": "J",
    "dailyCapacity": "K",
    "planOnMachineDate": "L",
    "moldWorkDays": "M",
    "workDays": "N",
    "planFinishDate": "O",
    "actualFinishDate": "P",
    "comment": "Q",
    "dailyWorkingHours": "R",
    "moldCavity": "S",
    "week": "T",
    "singleOrDoubleColor": "U",
    "conversionRate": "V",
    "status": "W",
}
#-----------------------------------------------------------------------------------

def main():
    #### main procedure start here ####
    # get cli parameters
    file_name = sys.argv[1]
    sheet_idx = sys.argv[2]
    wb = load_workbook(file_name, data_only=True)
    sheet = wb.worksheets[int(sheet_idx)]
    #sheet = wb[sheet_name]
    # get data from excel
    for row in sheet.iter_rows(min_row=5, max_col=23, max_row=6, values_only=True):
        # column_name and row mapping
        row = dict(zip(column_names, row))
        if row['productionArea'] is None:
            break
        row['workOrderDate'] = row['workOrderDate'].strftime('%Y-%m-%d')
        row['planOnMachineDate'] = row['planOnMachineDate'].strftime('%Y-%m-%d')
        row['planFinishDate'] = row['planFinishDate'].strftime('%Y-%m-%d')
        row['actualFinishDate'] = row['actualFinishDate'].strftime('%Y-%m-%d')
        row.pop('serialNumber') # remove serialNumber, system generated
        print(f"row: {row}")
        print(f"~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        ret = requests.post(api_url, json=row)
        print(ret.json())

def usage():
    print('usage: {} [-h] file_name sheet_idx'.format(sys.argv[0]))
    print('    -h, --help       help information')
    # print('    -d, --debug      force to print debug message')
    # print('    -v, --verbose    force print verbose information')


if __name__ == '__main__':
    try:
        opts, args = getopt.getopt(sys.argv[1:], 'h', ['help'])
    except(getopt.GetoptError):
        print('usage: {} [-h] '.format(sys.argv[0]))
        sys.exit()
    for opt, arg in opts:
        if opt in ("-h", "--help"):
            usage()
            sys.exit()
    main()
