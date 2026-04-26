from django.db import models

class IoTDevice(models.Model):
    name = models.CharField(max_length=100)           
    device_id = models.CharField(max_length=50)       
    latitude = models.FloatField()                    
    longitude = models.FloatField()                   
    status = models.CharField(max_length=20, default="Active")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.device_id})"