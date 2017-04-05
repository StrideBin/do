package org.common.test.quartz;

import org.quartz.Job;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.JobKey;

public class MyJob implements Job {
	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		JobDetail jobDetail= context.getJobDetail();
		JobKey key=jobDetail.getKey();
		String group = key.getGroup();
		String jobType = key.getName();
		if(group.equals("group1")){
			if(jobType.equals("myjob1")){
				System.out.println("group1..myjob1");
			}
			if(jobType.equals("myjob2")){
				System.out.println("group1..myjob2");
			}
		}
		if(group.equals("group2")){
			if(jobType.equals("myjob1")){
				System.out.println("group2..myjob1");
			}
			if(jobType.equals("myjob2")){
				System.out.println("group2..myjob2");
			}
		}
		
	}
}
