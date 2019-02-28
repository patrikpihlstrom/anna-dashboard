import re
import json

from django.http import HttpResponse
from django.template import loader

from .anna_client.client import Client


def index(request):
	template = loader.get_template('index.html')
	return HttpResponse(template.render({}, request))


def search(request):
	client = Client('http://annahub.se:5000')  # TODO: singleton
	client.authenticate(True)
	query = request.GET.urlencode()
	jobs = []
	for job in client.query(query):
		if all(attribute in job for attribute in ('container', 'status', 'log', 'updated_at', 'driver', 'site')):
			jobs.append({
				'tag': job['container'], 'driver': job['driver'], 'site': job['site'], 'status': job['status'],
				'log': job['log'][-int(job['log'].find(' ')):],
				'updated_at': re.sub(r'.*, ', '', job['updated_at'].rstrip(' GMT'))})
	return HttpResponse(json.dumps(jobs), content_type='application/json')
