```javascript
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("needs-form");

  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    const value = id => document.getElementById(id).value;

    const kernel = value("kernel");
    const purpose = value("purpose");
    const architecture = value("architecture");
    const firmware = value("firmware");
    const language = value("language");
    const level = value("level");

    const steps = [];

    if (architecture === "unknown") {
      steps.push(
        "Choose your target architecture first. x86_64 is a common choice for hobby PCs and virtual machines; ARM64 is common for ARM hardware."
      );
    } else {
      steps.push(
        `Set your project target to ${architecture}. Ensure your compiler, linker, boot method, and emulator all support this target.`
      );
    }

    if (kernel === "linux" || language === "linux") {
      steps.push(
        "Choose a Linux build workflow. Consider Buildroot for a compact custom system or Yocto for a highly configurable embedded distribution."
      );
      steps.push(
        "Obtain the appropriate Linux source or distribution source package, configure the kernel, build it with the correct toolchain, and assemble a matching root filesystem."
      );
    } else if (kernel === "custom") {
      steps.push(
        `Create a freestanding ${language === "rust" ? "Rust" : language === "cpp" ? "C++" : "C"} kernel project. Establish a target-aware toolchain and a clear bootloader-to-kernel interface.`
      );
      steps.push(
        "Build the smallest useful milestone first: a kernel that starts reliably and reports a diagnostic message."
      );
      steps.push(
        "Add exception handling, memory management, interrupts, timers, drivers, scheduling, and user space incrementally."
      );
    } else {
      steps.push(
        "Compare the Linux-based route with a custom kernel route before selecting your toolchain. Linux gives you existing drivers and mature functionality; a custom kernel gives you direct control but requires more implementation."
      );
    }

    if (firmware === "uefi") {
      steps.push(
        "Use UEFI. Decide whether to write a custom .efi loader or use an established boot protocol. Test the firmware path in QEMU with OVMF."
      );
    } else if (firmware === "bios") {
      steps.push(
        "Use a documented legacy BIOS boot path. Understand its boot-sector constraints and test in an emulator."
      );
    } else {
      steps.push(
        "Choose the boot method after confirming your hardware and bootloader requirements. UEFI is generally appropriate for modern PCs."
      );
    }

    if (purpose === "desktop") {
      steps.push(
        "Plan graphics, input, storage, networking, process isolation, user applications, and a desktop environment. Treat these as separate projects."
      );
    } else if (purpose === "server") {
      steps.push(
        "Prioritize reliable storage, networking, service management, permissions, logging, security updates, and remote administration."
      );
    } else if (purpose === "embedded") {
      steps.push(
        "Identify the exact board and peripherals. Check driver availability, cross-compilation requirements, image size, recovery options, and startup reliability."
      );
    } else if (purpose === "retro") {
      steps.push(
        "Document your target hardware or emulator, available memory, display and input devices, and the boot environment before writing hardware-specific code."
      );
    } else {
      steps.push(
        "Keep your first milestone small and use the demo gallery to choose a project with a manageable scope."
      );
    }

    if (level === "beginner") {
      steps.unshift(
        "Start with the OSForge introductory tutorial. Learn basic C or Rust, assembly fundamentals, binary formats, and command-line development before adding complex kernel features."
      );
    }

    steps.push(
      "Record tool versions and build commands, run the result in a virtual machine, inspect logs, and save a known-working checkpoint before making major changes."
    );

    const result = document.getElementById("plan-result");

    result.replaceChildren();

    const heading = document.createElement("h2");
    heading.textContent = "Your OSForge roadmap";
    result.appendChild(heading);

    const intro = document.createElement("p");
    intro.textContent =
      "Follow these steps in order. Exact commands depend on your host OS, toolchain, source version, and target.";
    result.appendChild(intro);

    const list = document.createElement("ol");

    for (const step of steps) {
      const item = document.createElement("li");
      item.textContent = step;
      list.appendChild(item);
    }

    result.appendChild(list);

    const link = document.createElement("a");
    link.className = "button";
    link.href = kernel === "linux" || language === "linux"
      ? "linux-kernel.html"
      : firmware === "uefi"
        ? "efi-bootloader.html"
        : "start.html";

    link.textContent = "Open the relevant tutorial →";
    result.appendChild(link);

    result.hidden = false;
    result.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
```
