import json
import os

from django.http import HttpResponse
from django.template import loader
import requests


def index(request):
	template = loader.get_template('index.html')
	headers = {'Authorization': 'Bearer ' + str(os.environ['ANNA_SECRET'])}
	response = requests.get(os.environ['ANNA_HOST'] + '/v1.0/get',
	                        params={'status': ['running', 'starting', 'pending']}, headers=headers)
	jobs = json.loads(response.content)
	jobs = [{'tag': job['tag'], 'status': job['status'],
	         'log': job['log'][-int(job['log'].find(' ')):], 'updated_at': job['updated_at']}
	        for job in jobs]
	return HttpResponse(template.render({'jobs': jobs}, request))


def done(request):
	template = loader.get_template('index.html')
	return HttpResponse(template.render({}, request))
