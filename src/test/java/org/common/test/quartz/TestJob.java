package org.common.test.quartz;
import org.quartz.SchedulerException;

public class TestJob {

	/**
	 * @param args
	 * @throws SchedulerException
	 */
	public static void main(String[] args) throws SchedulerException {

		SchedulerUtils.useJob();
//		SchedulerUtils.addJob("myjob1", "group1", "*/1 * * * * ?", MyJob.class);// 启动任务，每隔5s执行一次MyJob任务
//		SchedulerUtils.addJob("myjob2", "group1", "*/1 * * * * ?", MyJob.class);
//		SchedulerUtils.addJob("myjob1", "group2", "*/1 * * * * ?", MyJob.class);
		SchedulerUtils.addSimpleJob("myjob1", "group1",1,MyJob.class);
		// t.deleteJob("myjob1");//停止任务
	}

}
