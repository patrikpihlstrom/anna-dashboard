from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader


def index(request):
	template = loader.get_template('unittests/index.html')
	context = {}
	return HttpResponse(template.render(context, request))


def switch_to(request):
	template = loader.get_template('unittests/switch_to.html')
	context = {}
	return HttpResponse(template.render(context, request))
