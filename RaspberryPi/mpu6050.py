#!/usr/bin/python

import smbus

import math



# Power management registers

power_mgmt_1 = 0x6b
power_mgmt_2 = 0x6c

bus = smbus.SMBus(1) # or bus = smbus.SMBus(1) for Revision 2 boards
address = 0x68       # This is the address value read via the i2cdetect command


def read_byte(adr):

    return bus.read_byte_data(address, adr)

def read_word(adr):

    high = bus.read_byte_data(address, adr)

    low = bus.read_byte_data(address, adr+1)

    val = (high << 8) + low

    return val



def read_word_2c(adr):

    val = read_word(adr)

    if (val >= 0x8000):

        return -((65535 - val) + 1)

    else:

        return val



def dist(a,b):

    return math.sqrt((a*a)+(b*b))



def get_y_rotation(x,y,z):

    radians = math.atan2(x, dist(y,z))

    return -math.degrees(radians)



def get_x_rotation(x,y,z):

    radians = math.atan2(y, dist(x,z))

    return math.degrees(radians)


def check_Valance():
    data = False
    bus.write_byte_data(address, power_mgmt_1, 0)

    gyro_xout = read_word_2c(0x43)
    gyro_yout = read_word_2c(0x45)
    gyro_zout = read_word_2c(0x47)
    
    accel_xout = read_word_2c(0x3b)
    accel_yout = read_word_2c(0x3d)
    accel_zout = read_word_2c(0x3f)

    accel_xout_scaled = accel_xout / 16384.0
    accel_yout_scaled = accel_yout / 16384.0
    accel_zout_scaled = accel_zout / 16384.0
    
    x = abs(get_x_rotation(accel_xout_scaled, accel_yout_scaled, accel_zout_scaled))
    y = abs(get_y_rotation(accel_xout_scaled, accel_yout_scaled, accel_zout_scaled))
    
    if x <= 4 and y >= 80 and y <=90:
		data = True

    return data




