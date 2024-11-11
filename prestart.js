const { exec } = require("child_process");
const os = require("os");

// Hàm dừng ứng dụng đang nghe trên cổng 3000
async function killPort3000() {
  if (os.platform() === "darwin" || os.platform() === "linux") {
    // MacOS hoặc Linux
    try {
      const { stdout, stderr } = await execPromise(
        "lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9"
      );
      if (stderr) {
        console.error(`Lỗi khi dừng cổng 3000 trên macOS/Linux: ${stderr}`);
      } else {
        console.log("Đã dừng ứng dụng trên cổng 3000 (macOS/Linux).");
      }
    } catch (error) {
      console.error(
        `Lỗi khi dừng cổng 3000 trên macOS/Linux: ${error.message}`
      );
    }
  } else if (os.platform() === "win32") {
    // Windows
    try {
      const { stdout, stderr } = await execPromise(
        "netstat -aon | findstr :3000"
      );
      if (stderr) {
        console.error(`Lỗi khi tìm kiếm cổng 3000 trên Windows: ${stderr}`);
        return;
      }

      const lines = stdout.trim().split("\n");
      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1]; // PID là giá trị cuối
        try {
          const { killStdout, killStderr } = await execPromise(
            `taskkill /F /PID ${pid}`
          );
          if (killStderr) {
            console.error(
              `Lỗi khi dừng cổng 3000 trên Windows (PID: ${pid}): ${killStderr}`
            );
          } else {
            console.log(
              `Đã dừng ứng dụng trên cổng 3000 (Windows), PID: ${pid}.`
            );
          }
        } catch (killError) {
          console.error(
            `Lỗi khi dừng ứng dụng với PID ${pid}: ${killError.message}`
          );
        }
      }
    } catch (error) {
      console.error(
        `Lỗi khi tìm kiếm cổng 3000 trên Windows: ${error.message}`
      );
    }
  } else {
    console.log("Hệ điều hành không được hỗ trợ.");
  }
}

// Wrapper để sử dụng Promises với exec
function execPromise(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

killPort3000();
