# Installing NVIDIA Drivers on Fedora Linux

This guide documents **exactly** how I fixed broken NVIDIA GPU acceleration on Fedora after discovering that my system was silently using **Intel Iris Xe** instead of my **RTX 3050**.

These are the exact commands I ran, in the order I ran them.

---

## Context

Symptoms:

- Very low FPS in Proton games
- Games running noticeably worse than on Arch / Nix on the same hardware
- Steam launching correctly, but performance was terrible

Initial assumption was Proton or Vulkan misconfiguration.

That assumption was wrong.

---

## GPU Check
Before touching drivers, verify what the system is rendering with.

### OpenGL renderer check

```bash
glxinfo | grep "OpenGL renderer"
````

Output showed:

```
Mesa Intel(R) Iris(R) Xe Graphics (RPL-P)
```

This was the first red flag.
On a laptop with an **RTX 3050**, this means Fedora is **not using NVIDIA at all**.

### Vulkan Check

```bash
vulkaninfo | less
```

This showed multiple devices, including:

* Intel Iris Xe
* NVIDIA RTX 3050
* llvmpipe (software renderer)

But the presence of NVIDIA here **does not** mean the driver is installed or active.

---

## Confirm NVIDIA Driver Is Missing

```bash
nvidia-smi
```

Result:

```
command not found
```

This confirms the NVIDIA driver is not installed.

---

## Enable RPM Fusion Repositories

Fedora does **not** ship NVIDIA drivers by default.

Enable RPM Fusion (free + nonfree):

```bash
sudo dnf install -y \
  https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm \
  https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
```

---

## Install NVIDIA Driver Packages

Install the NVIDIA kernel module and CUDA utilities:

```
sudo dnf install -y akmod-nvidia xorg-x11-drv-nvidia-cuda
```

Notes:

* **akmod-nvidia** builds the kernel module for your current kernel
* This may take a moment
* Nothing will work yet, the module still needs to build

```
sudo akmods --force
```

Expected output includes lines like:

```
Checking kmods exist for <kernel-version> [ OK ]
```

If you see OK messages, the module built successfully.

---

## Reboot

This step is **mandatory**.

```bash
sudo reboot
```

## Verify

After reboot, run:

```bash
nvidia-smi
```

Expected output resembles:

```
NVIDIA-SMI <version>
Driver Version: <version>
CUDA Version: <version>
GPU: NVIDIA GeForce RTX 3050
```

This confirms the NVIDIA driver is loaded and active.
Re-run the earlier checks.

### OpenGL renderer

```bash
glxinfo | grep "OpenGL renderer"
```

This should **no longer** show Intel Iris Xe.

### Vulkan devices

```bash
vulkaninfo | grep -E "GPU|deviceName"
```

You should see the NVIDIA GPU listed as a discrete device.

---

## Result

* NVIDIA driver active
* RTX 3050 correctly detected
* Proton games immediately returned to expected performance

The key lesson:

> Fedora will happily run on Intel graphics without telling you.
> Vulkan and OpenGL output are often more revealing than error messages.

---

## Commands Used (Audit Trail)

For reference, these were the exact commands executed during troubleshooting:

```
glxinfo | grep "OpenGL renderer"
vulkaninfo
nvidia-smi

sudo dnf install -y akmod-nvidia xorg-x11-drv-nvidia-cuda
sudo akmods --force
sudo reboot

nvidia-smi
vulkaninfo | grep -E "GPU|deviceName"
```

---
