# 2null16-bra

====================================================

Software dependencies
----------------------------------------------------

To start the server proper it is necessary to install following software:

* NodeJS        [http://nodejs.org](http://nodejs.org)


Setup & Start Server
----------------------------------------------------

1. resolve dependencies

        npm install

2. show all available tasks

        gulp --tasks

3. start server

        gulp start


Install on Rasperry Pi
----------------------------------------------------
### SSH keys(local machine, in my case: mac)
```
brew install ssh-copy-id
ssh-copy-id pi@raspberrypi
```
### Install Node (pi)

```
  wget http://node-arm.herokuapp.com/node_latest_armhf.deb
  sudo dpkg -i node_latest_armhf.deb
```
### For Noble (bluetooth on pi)
```
  sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev
  sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)
```

### pm2 (pi)
```
 sudo mkdir -p /opt/.pm2
 sudo echo "export PM2_HOME=/opt/.pm2" >> /etc/profile
 sudo chmod -R 777 /opt/.pm2
 sudo npm install -g pm2 --unsafe-perm
```

### post-receive (pi)
```
 sudo apt-get install git
 mkdir -p ~/2null16-bra.git
 cd ~/2null16-bra.git
 git init --bare
 mkdir -p ~/2null16-bra
```
Then copy content of file scripts/post-receive in
2null16-bra.git/hooks/post-receive
and (pi)

```
sudo chmod +x ~/2null16-bra.git/hooks/post-receive
```

On local machine:
```
git remote add pi pi@raspberrypi:2null16-bra.git
```

### Push to Repo (local)

For the first time disable npm stop script in package.json by adding a #

```
...
"stop": "#pm2 stop 2null16-bra"
...
```

Then:
```
git remote add pi pi@raspberrypi:2null16-bra.git
git push pi master
```
Enable npm stop script

### Enable Startup on Restart
```
pm2 startup
pm2 save
```