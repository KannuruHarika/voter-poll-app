# Generated by Django 5.0.7 on 2024-07-17 09:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='VotingStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_voting_complete', models.BooleanField(default=False)),
            ],
        ),
        migrations.AlterField(
            model_name='vote',
            name='party',
            field=models.CharField(choices=[('BJP', 'Bharatiya Janata Party'), ('INC', 'Indian National Congress'), ('AAP', 'Aam Aadmi Party')], max_length=3),
        ),
    ]
