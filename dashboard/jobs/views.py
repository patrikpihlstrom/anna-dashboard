import re
import json

from django.http import HttpResponse
from django.template import loader

from .anna_client.client import Client


def index(request):
	template = loader.get_template('index.html')
	return HttpResponse(template.render({}, request))


def search(request):
	client = Client()  # TODO: singleton
	client.authenticate(True)
	query = {}
	for key, val in dict(request.GET).items():
		query[str(key).replace('[]', '')] = val
	jobs = []
	for job in client.query(query):
		jobs.append({
			'tag': job['container'], 'driver': job['driver'], 'site': job['site'], 'status': job['status'],
			'log': job['log'][-int(job['log'].find(' ')):],
			'updated_at': re.sub(r'.*, ', '', job['updated_at'].rstrip(' GMT'))})
	return HttpResponse(json.dumps(jobs), content_type='application/json')
