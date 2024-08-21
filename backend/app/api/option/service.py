import json
from collections import OrderedDict
import sys
import importlib
from flask import current_app
from app import db
from backend.app.utils_log import message, err_resp, internal_err_resp
from app.models.option import Option
from .schemas import optionSchema
option_schema = optionSchema()


def str_to_class(module_name, class_name):
    """Return a class instance from a string reference"""
    try:
        module_ = importlib.import_module(module_name)
        try:
            class_ = getattr(module_, class_name)()
        except AttributeError:
            raise AttributeError('Class does not exist')
    except ImportError:
        raise ImportError('Module does not exist')
    return class_ or None


class optionService:
    @staticmethod
    def get_options(name, id = None):
        try:
            # get the option list from the database
            option_db = Option.query.filter(Option.name == name.lower()).first()
            if option_db is None:
                return err_resp("option not found", "option_404", 404)
            
            option_list = json.loads(option_db.content)
            if id is not None:
                option_list = [item for item in option_list if item["id"] == id]

            resp = message(True, "option data sent")
            resp["data"] = option_list
            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        
    
    # create multiple options
    @staticmethod
    def create_option(name, payload):
        try:
            # get the model class from the name string
            model = str_to_class(f"app.api.option.models.{name[0].lower()}{name[1:]}", f"{name[0].capitalize()}{name[1:]}")
            
            # get all attributes from the model class and set them to the model instance
            for key in model.__dict__.keys():
                if key in payload.keys():
                    model.__setattr__(key, payload[key])
                else:
                    model.__setattr__(key, None)
            
            # get the option list from the database
            option_db = Option.query.filter(Option.name == name.lower()).first()
            if option_db is None:
                return err_resp("option not found", "option_404", 404)
            
            option_list = json.loads(option_db.content)
            # get the last id from the option list and update the id of the model instance
            last_id = option_list[-1].get('id', 0) + 1 if len(option_list) > 0 else 1
            od = OrderedDict(model.__dict__.items())
            od.update({'id':last_id})
            od.move_to_end('id', last=False)
            option_list.append(dict(od))
            
            option_db.content = json.dumps(option_list)
            db.session.add(option_db)
            db.session.flush()
            db.session.commit()

            resp = message(True, "options have been created..")
            resp["data"] = option_list

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error


    # update multiple options
    @staticmethod
    def update_option(name, payload):
        try:
            # get the model class from the name string
            model = str_to_class(f"app.api.option.models.{name[0].lower()}{name[1:]}", f"{name[0].capitalize()}{name[1:]}")
            # get all attributes from the model class and set them to the model instance
            for key in model.__dict__.keys():
                if key in payload.keys():
                    model.__setattr__(key, payload[key])
                else:
                    model.__setattr__(key, None)
            # get the option list from the database
            option_db = Option.query.filter(Option.name == name.lower()).first()
            if option_db is None:
                return err_resp("option not found", "option_404", 404)
            option_list = json.loads(option_db.content)

            # update the selected option with model instance
            option_list = [model.__dict__ if item["id"] == model.id else item for item in option_list]

            # update DB
            option_db.content = json.dumps(option_list)
            db.session.add(option_db)
            db.session.flush()
            db.session.commit()
                
            resp = message(True, "options have been updated..")
            resp["data"] = option_list

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error
        
    
    @staticmethod
    def delete_option(name, id):
        try:
            # get the option list from the database
            option_db = Option.query.filter(Option.name == name.lower()).first()
            if option_db is None:
                return err_resp("option not found", "option_404", 404)
            option_list = json.loads(option_db.content)

            # delete the selected option with model instance
            option_list = [item for item in option_list if item["id"] != id]
            
            # update DB
            option_db.content = json.dumps(option_list)
            db.session.add(option_db)
            db.session.flush()
            db.session.commit()
            
            resp = message(True, "options have been updated..")
            resp["data"] = option_list

            return resp, 200
        # exception without handling should raise to the caller
        except Exception as error:
            raise error